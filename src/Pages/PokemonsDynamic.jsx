import { useEffect, useState } from "react"
import {  getPokemonDetails } from "../services"
import { Link, useParams, useNavigate } from "react-router-dom"
import { colorByType } from "../helpers/colorType"
import { formatId } from "../helpers/formatId"
import { capitalizeFirstLetter } from "../helpers/capitalizeLetter"
import Spinner from "../components/Spinner"

const PokemonsDynamic = () => {
  const [pokemon, setPokemon] = useState({})
  const [infoActive, setInfoActive] = useState("Stats")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  const {pokeid} = useParams()
  
  useEffect(() => {
    const fetchPokemonDetail = async () => {
        try {
            setLoading(true);
            const pokeInfo = await getPokemonDetails(pokeid);
            setPokemon(pokeInfo);
        } catch (error) {
            if (error.message === "Pokémon not found") {
                navigate("*"); 
            } else {
                console.error("Error fetching Pokémon details:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    fetchPokemonDetail();
}, [pokeid, navigate]);

  const handleButtonClick = (section) => {
    setInfoActive(section)
  }
  
  const {name,height, weight,types,img, id, description, sprites, stats, matchups, evolutions, genus, abilities, baseExperience, captureRate, baseHappiness, growthRate, eggGroups, habitat, isLegendary, isMythical, cry, totalStats} = pokemon

  const playCry = () => {
    if (!cry) return
    const audio = new Audio(cry)
    audio.volume = 0.4
    audio.play().catch(() => {})
  }

  const multLabel = (m) => (m === 0.25 ? "¼×" : m === 0.5 ? "½×" : m === 2 ? "2×" : m === 4 ? "4×" : `${m}×`)

  const colorBarraStat = (number) => {
    if (number < 100) {
      return "bg-indigo-600";
    } else if (number < 150) {
      return "bg-cyan-300";
    } else if (number < 200) {
      return "bg-yellow-400";
    } else {
      return "bg-yellow-400 shadow-lg shadow-yellow-300 rouned-none";
    }
  };

  const widthStat = (number)=> {
      if (number > 245) {
        const newNumber = 245
        return newNumber
      } 
      return number
  }

const formatHeight = (height) => {
  return (height / 10).toFixed(1) + ' m';
};

const formatWeight = (weight) => {
  return (weight / 10).toFixed(1) + ' kg';
};

  if (loading) {
    return <Spinner />; 
  }
  
  return (
    <div className="w-full md:flex flex-col md:items-center">
      <section className="flex flex-col items-center gap-5">
        <div className=" w-full">
      <button 
        className="text-blue-600 hover:text-blue-700"
        onClick={() => navigate(-1)}
      >
        Atrás
      </button>
        </div>
       <div className="text-center flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">{capitalizeFirstLetter(name)}</p>
          {cry && (
            <button onClick={playCry} aria-label="Escuchar sonido" title="Escuchar sonido"
              className="text-neutral-400 hover:text-white">🔊</button>
          )}
        </div>
        <p className="text-sm text-neutral-400">{formatId(+id)}</p>
        {genus && <p className="text-sm text-neutral-300">{genus}</p>}
        <div className="flex gap-2">
          {isLegendary && <span className="text-xs bg-yellow-600 rounded-full px-2 py-0.5">Legendario</span>}
          {isMythical && <span className="text-xs bg-purple-600 rounded-full px-2 py-0.5">Mítico</span>}
        </div>
       </div>
      <div  className={`bg-gradient-to-b from-neutral-900/100 to-transparent/40 ${
    types && types[0] ? colorByType[types[0].type.name] : "bg-neutral-800"
  } bg-opacity-40  rounded-full p-3`}>
          <img 
          className="w-[250px]"
          src={img} alt="imagen del pokemon" />
       </div> 
          <div className="flex gap-5">
            {types?.map((tipo,i) => (
              <p 
              className={`${colorByType[tipo.type.name]}  rounded-full py-1 px-4 w-[86px] text-center`}
              key={i}>{tipo.type.name}</p>
            ) )}
          </div>
          <div className="flex justify-between">
          {evolutions?.length > 1 ? (
            evolutions.map((evo, i) => (
              <div key={i} className="flex flex-col items-center">
                <Link 
                
                to={`/${evo.name}`}>
                <img className="scale-75 hover:bg-neutral-600  bg-neutral-500 rounded-full h-[100px] w-[100px] bg-opacity-15 p-2" src={evo.image} alt="imagen de evoluciones" />
                </Link>
                <p className="text-sm">{capitalizeFirstLetter(evo.name)}</p>
                <p className="text-sm">Nv: {evo.min_level}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm font-semibold mt-0">No tiene evolucion.</p>
          )}
          </div>
      </section>
      <div className="flex justify-between mt-10  md:w-[500px]">
      <button 
          onClick={() => handleButtonClick("Stats")}
          className={`bg-neutral-800 px-5 py-3 rounded-tl-xl w-full hover:bg-neutral-700 ${infoActive === "Stats" ? "bg-neutral-700 border-b-2 border-indigo-800" : ""}`}
        >
          Stats
        </button>
        <button 
          onClick={() => handleButtonClick("Info")}
          className={`bg-neutral-800 px-5 py-3 w-full hover:bg-neutral-700 ${infoActive === "Info" ? "bg-neutral-700 border-b-2 border-indigo-800" : ""}`}
        >
          Info
        </button>
        <button
          onClick={() => handleButtonClick("Debilidades")}
          className={`bg-neutral-800 px-3 py-3 rounded-tr-xl w-full hover:bg-neutral-700 ${infoActive === "Debilidades" ? "bg-neutral-700 border-b-2 border-indigo-800" : ""}`}
        >
          Debilidades
        </button>
      </div>

      {infoActive === "Stats" && (
        <section className="bg-neutral-800 py-5 p-2 pt-10 md:w-[500px]">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 font-bold w-[50px]">
              {stats?.map((stat, i) => (
                <p key={i}>{stat.name}</p>
              ))}
            </div>
            <div className="flex flex-col gap-3  w-full ">
              {stats?.map((stat, i) => (
                <div 
                className="flex gap-1 items-center "
                key={i}>
                  <p className="w-[35px] text-sm">{stat.stat}</p>
                  <div className={`w-[30px] h-3 ${colorBarraStat(stat.stat)} rounded-tr rounded-br`} style={{ width: `${widthStat(stat.stat)}px` }}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between font-bold border-t border-neutral-700 mt-4 pt-3 px-1">
            <p>Total</p>
            <p className="text-indigo-400">{totalStats}</p>
          </div>
        </section>
      )}
   

   {infoActive === "Info" && (
        <section className="bg-neutral-800 py-5 p-2 pt-10 flex flex-col gap-12 items-center  md:w-[500px]">
          <p>{description}</p>
          <div className="flex justify-between w-full px-10 bg-neutral-700 py-7 rounded-t-lg font-bold">
            <p>{`Altura: ${formatHeight(height)}`}</p>
            <p>{`Peso: ${formatWeight(weight)}`}</p>
          </div>

          <div className="w-full px-4 flex flex-col gap-2">
            <p className="font-bold">Habilidades</p>
            <div className="flex gap-2 flex-wrap">
              {abilities?.map((ab, i) => (
                <span key={i} className="bg-neutral-700 rounded-full px-3 py-1 text-sm">
                  {capitalizeFirstLetter(ab.name.replace(/-/g, " "))}
                  {ab.hidden && <span className="text-yellow-400 text-xs"> (oculta)</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full px-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="flex justify-between border-b border-neutral-700 py-1"><span className="text-neutral-400">Exp. base</span><span className="font-bold">{baseExperience ?? "—"}</span></div>
            <div className="flex justify-between border-b border-neutral-700 py-1"><span className="text-neutral-400">Ratio captura</span><span className="font-bold">{captureRate}</span></div>
            <div className="flex justify-between border-b border-neutral-700 py-1"><span className="text-neutral-400">Felicidad</span><span className="font-bold">{baseHappiness}</span></div>
            <div className="flex justify-between border-b border-neutral-700 py-1"><span className="text-neutral-400">Crecimiento</span><span className="font-bold">{growthRate}</span></div>
            <div className="flex justify-between border-b border-neutral-700 py-1"><span className="text-neutral-400">Hábitat</span><span className="font-bold">{habitat}</span></div>
            <div className="flex justify-between border-b border-neutral-700 py-1"><span className="text-neutral-400">Grupos huevo</span><span className="font-bold text-right">{eggGroups?.join(", ")}</span></div>
          </div>

          {sprites && sprites.length > 0 ? (
            <div className="flex flex-col items-center gap-5">
              <p className="text-lg font-bold">Sprites</p>
              <div className="flex gap-3 items-center justify-between">
                {sprites.map((sprite, i) => (
                  sprite && (
                    <img
                      className="object-contain"
                      key={i}
                      src={sprite}
                      alt="imagen del sprite"
                    />
                  )
                ))}
              </div>
            </div>
          ) : (
            <p className="bg-red-500 p-10 text-white">No hay sprites disponibles</p>
          )}
        </section>
      )}

{infoActive === "Debilidades" && (
        <section className="bg-neutral-800 py-5 p-4 pt-10 flex flex-col gap-6 items-start md:w-[500px] w-full">
          <div className="w-full">
            <p className="mb-2 font-bold text-red-400">Débil contra (recibe más daño)</p>
            <div className="flex gap-2 flex-wrap">
              {matchups?.weak?.length > 0 ? matchups.weak.map((tipo, i) => (
                <p className={`${colorByType[tipo.name]} rounded-full py-1 px-3 text-sm flex items-center gap-1`} key={i}>
                  {tipo.name} <span className="font-bold text-black/70">{multLabel(tipo.mult)}</span>
                </p>
              )) : <p className="text-sm text-neutral-400">Ninguna.</p>}
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 font-bold text-green-400">Resistente contra (recibe menos daño)</p>
            <div className="flex gap-2 flex-wrap">
              {matchups?.resist?.length > 0 ? matchups.resist.map((tipo, i) => (
                <p className={`${colorByType[tipo.name]} rounded-full py-1 px-3 text-sm flex items-center gap-1`} key={i}>
                  {tipo.name} <span className="font-bold text-black/70">{multLabel(tipo.mult)}</span>
                </p>
              )) : <p className="text-sm text-neutral-400">Ninguna.</p>}
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 font-bold text-blue-300">Inmune contra (sin daño)</p>
            <div className="flex gap-2 flex-wrap">
              {matchups?.immune?.length > 0 ? matchups.immune.map((tipo, i) => (
                <p className={`${colorByType[tipo.name]} rounded-full py-1 px-3 text-sm`} key={i}>{tipo.name}</p>
              )) : <p className="text-sm text-neutral-400">Ninguna.</p>}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PokemonsDynamic