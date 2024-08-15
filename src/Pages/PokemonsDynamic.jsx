import { useEffect, useState } from "react"
import { getDescriptionPokemon, getPokemonDetails } from "../services"
import { Link, useParams } from "react-router-dom"
import { colorByType } from "../helpers/colorType"
import { formatId } from "../helpers/formatId"
import { capitalizeFirstLetter } from "../helpers/capitalizeLetter"

const PokemonsDynamic = () => {
  const [pokemon, setPokemon] = useState({})
  const [infoActive, setInfoActive] = useState("Stats")

  const {pokeid} = useParams()
  
  useEffect(() => {
    const fetchPokemonDetail = async ()=> {
     const pokeInfo = await getPokemonDetails(pokeid)
     const pokeDescription = await getDescriptionPokemon(pokeInfo.id)
     console.log({...pokeInfo,pokeDescription })
     setPokemon({...pokeInfo, description : pokeDescription})
    }
 
  
    fetchPokemonDetail()
  }, [])

  const handleButtonClick = (section) => {
    setInfoActive(section)
  }
  
  const {name,height, weight,types,img, id, description, sprites, stats} = pokemon

  return (
    <div>
      <section className="flex flex-col items-center gap-5">
        <Link 
        to="/"
        className="text-start text-blue-500 hover:text-blue-400 w-full px-2">Atras</Link>
       <div className="text-center">
        <p className="text-xl font-bold">{capitalizeFirstLetter(name)}</p>
        <p className="text-sm">{formatId(+id)}</p>
       </div>
          <img 
          className="w-[250px]"
          src={img} alt="imagen del pokemon" />
          <div className="flex gap-5">
            {types?.map((tipo,i) => (
              <p 
              className={`bg-[${colorByType[tipo.type.name]}]  rounded-full py-1 px-2`}
              key={i}>{tipo.type.name}</p>
            ) )}
          </div>
      </section>
      <div className="flex justify-between mt-10">
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
          onClick={() => handleButtonClick("Ataques")}
          className={`bg-neutral-800 px-5 py-3 rounded-tr-xl w-full hover:bg-neutral-700 ${infoActive === "Ataques" ? "bg-neutral-700 border-b-2 border-indigo-800" : ""}`}
        >
          Ataques
        </button>
      </div>

      {infoActive === "Stats" && (
        <section className="bg-neutral-800 py-5 p-2 pt-10">
          <div className="flex justify-between ">
            <div className="flex flex-col gap-2 font-bold">
              {stats?.map((stat, i) => (
                <p key={i}>{stat.name}</p>
              ))}
            </div>
            <div className="flex flex-col gap-2 font-bold">
              {stats?.map((stat, i) => (
                <p key={i}>{stat.stat}</p>
              ))}
            </div>
          </div>
        </section>
      )}
   

      {infoActive === "Info" && (
        <section className="bg-neutral-800 py-5 p-2 pt-10 flex flex-col gap-12 items-center ">
          <p>{description}</p>
          <div className="flex justify-between w-full px-10 ">
          <p>{`Height: ${height}`}</p>
          <p>{`Weight: ${weight}`}</p>
          </div>
          <div className="flex  flex-col items-center gap-5 ">
            <p className="text-lg font-bold">Sprites</p>
            <div className="flex gap-3 items-center justify-between">
            {sprites?.map((sprite, i) => (
              <img 
                className="object-contain "
                key={i} 
                src={sprite} 
                alt="imagen del sprite" 
              />
            ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PokemonsDynamic