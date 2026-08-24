import axios from "axios"
import { getEvolutions } from "./helpers/evolutionChain"
import { cached } from "./cache"

const API = "https://pokeapi.co/api/v2"
const SPRITES = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
// Tipos reales de Pokémon (se excluyen stellar/unknown/shadow).
const TYPES = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"]

const idFromUrl = (url) => Number(url.split("/").filter(Boolean).pop())

const spriteFor = (id) => `${SPRITES}/${id}.png`
const animatedFor = (id) => id <= 649
  ? `${SPRITES}/versions/generation-v/black-white/animated/${id}.gif`
  : `${SPRITES}/${id}.png`

// Antes: 1 + 807 requests (uno por Pokémon). Ahora: 1 (lista) + 18 (tipos) = 19.
// Los tipos se obtienen por /type/{name} y los sprites se derivan del id.
export const getAllPokemons = (limit = 807) => cached(`pokemons_all_${limit}`, async () => {
  try {
    const { data } = await axios.get(`${API}/pokemon?limit=${limit}&offset=0`)
    const list = data.results.map(p => ({ id: idFromUrl(p.url), name: p.name }))
    const byId = new Map(list.map(p => [p.id, []]))

    const typeResults = await Promise.all(
      TYPES.map(t => axios.get(`${API}/type/${t}`).then(r => ({ t, data: r.data })))
    )
    typeResults.forEach(({ t, data }) => {
      data.pokemon.forEach(({ pokemon, slot }) => {
        const id = idFromUrl(pokemon.url)
        if (byId.has(id)) byId.get(id).push({ slot, type: { name: t } })
      })
    })

    const PokemonsInfo = list.map(p => {
      const types = byId.get(p.id).sort((a, b) => a.slot - b.slot)
      return {
        id: p.id,
        name: p.name,
        spriteFix: spriteFor(p.id),
        img: animatedFor(p.id),
        types: types.length ? types : [{ slot: 1, type: { name: "normal" } }]
      }
    })

    return { PokemonsInfo, numberPage: data.count }
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error)
    return { PokemonsInfo: [], numberPage: 0 }
  }
}, { persist: true, isValid: (v) => v?.PokemonsInfo?.length > 0 })

export const getPokemonDetails = (poke) => cached(`poke_detail_${poke}`, async () => {
  try {
    const { data: pokemon } = await axios.get(`${API}/pokemon/${poke}`)
    const { data: dataSpecies } = await axios.get(pokemon.species.url)
    const { data: dataEvolution } = await axios.get(dataSpecies.evolution_chain.url)

    const [evolutions, pokeCounters] = await Promise.all([
      getEvolutions(dataEvolution),
      getCountersPokemon(pokemon.types[0].type.name)
    ])

    // Descripción en español desde la species ya obtenida (evita re-fetch).
    const flavor = dataSpecies.flavor_text_entries.find(e => e.language.name === "es")
    const description = flavor ? flavor.flavor_text : "Descripción en español no disponible."

    const { id, sprites, name, height, weight, types, stats } = pokemon

    return {
      id,
      name,
      types,
      height,
      weight,
      description,
      pokeCounters,
      evolutions,
      sprites: [
        sprites.versions["generation-i"]["red-blue"].front_default,
        sprites.versions["generation-iii"].emerald.front_default,
        sprites.versions["generation-iii"]["firered-leafgreen"].front_default,
        sprites.versions["generation-v"]["black-white"].animated.front_default
      ],
      img: sprites.other["official-artwork"].front_default,
      stats: [
        { name: "Hp", stat: stats[0].base_stat },
        { name: "Atk", stat: stats[1].base_stat },
        { name: "Def", stat: stats[2].base_stat },
        { name: "SpA", stat: stats[3].base_stat },
        { name: "SpD", stat: stats[4].base_stat },
        { name: "SPD", stat: stats[5].base_stat }
      ]
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Pokémon not found")
    }
    console.error("Error fetching Pokémon details:", error)
    throw error
  }
}, { persist: true, isValid: (v) => v !== null })

export const getDescriptionPokemon = async (idPoke) => {
  const { data } = await axios.get(`${API}/pokemon-species/${idPoke}`)
  const flavorTextEntry = data.flavor_text_entries.find(entry => entry.language.name === "es")
  return flavorTextEntry ? flavorTextEntry.flavor_text : "Descripción en español no disponible."
}

export const getCountersPokemon = async (idPoke) => {
  const { data } = await axios.get(`${API}/type/${idPoke}`)
  return data.damage_relations
}

export const getEvolutionsData = (evolutions) => {
  return evolutions.map(
    async (evolution) => await axios.get(`${API}/pokemon/${evolution.name}/`)
  )
}
