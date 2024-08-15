import { useEffect, useState } from "react"
import { getAllPokemons } from "../services"
import CardPokemon from "../components/CardPokemon"
import SearchBar from "../components/SearchBar"

const Home = () => {
    const [pokemons, setpokemons] = useState([])

    useEffect( ()=>{

       const fetchpokemons = async ()=> {
           const pokemons = await  getAllPokemons()
          /*  console.log(pokemons) */
           setpokemons(pokemons)
       } 

       fetchpokemons()
    },[])

  return (
    <>
       <SearchBar/>
        <div className="flex gap-5 flex-wrap justify-center my-10">
        {pokemons?.map( (pokemon,i) => (
            <CardPokemon key={i} pokemon={pokemon} />
        ) )}
        </div>
    </>
 
  )
}

export default Home