// Caché ligero: memoria (instantáneo dentro de la SPA) + localStorage con TTL
// (sobrevive recargas) + dedupe de requests en vuelo. No cachea resultados
// inválidos. Los datos de Pokémon casi no cambian -> TTL largo.
const mem = new Map();
const inflight = new Map();
// La versión invalida cachés viejos cuando cambia la forma de los datos
// (p. ej. el detalle pasó de `pokeCounters` a `matchups`).
const SCHEMA = "v2";
const PREFIX = `pokecache:${SCHEMA}:`;
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 días

// Purga entradas de versiones anteriores al cargar el módulo.
try {
  Object.keys(window.localStorage)
    .filter(k => k.startsWith("pokecache:") && !k.startsWith(PREFIX))
    .forEach(k => window.localStorage.removeItem(k));
} catch { /* noop */ }

export const cached = async (key, fn, { ttl = DEFAULT_TTL, persist = false, isValid = () => true } = {}) => {
  const now = Date.now();

  const hit = mem.get(key);
  if (hit && now - hit.t < ttl) return hit.v;

  if (persist) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (now - parsed.t < ttl && isValid(parsed.v)) {
          mem.set(key, parsed);
          return parsed.v;
        }
      }
    } catch { /* noop */ }
  }

  if (inflight.has(key)) return inflight.get(key);

  const promise = (async () => {
    try {
      const v = await fn();
      if (isValid(v)) {
        const entry = { t: Date.now(), v };
        mem.set(key, entry);
        if (persist) {
          try { window.localStorage.setItem(PREFIX + key, JSON.stringify(entry)); } catch { /* cuota */ }
        }
      }
      return v;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
};
