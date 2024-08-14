import { useEffect, useState } from "react"
import { getPokemonDetails } from "../services"
import { useParams } from "react-router-dom"

const PokemonsDynamic = () => {
  const [pokemon, setPokemon] = useState({})

  const {pokeid} = useParams()
  console.log(pokeid)
  
  useEffect(() => {
    const fetchPokemonDetail = async ()=> {
     const pokeInfo = await getPokemonDetails(pokeid)
   /*   console.log(pokeInfo) */
     setPokemon(pokeInfo)
    }
 
  
    fetchPokemonDetail()
  }, [])
  
  const {name,height, weight,types,img, img2} = pokemon

  return (
    <div>
      <img src={img} />
      <img src={img2} />
    </div>
  )
}

export default PokemonsDynamic