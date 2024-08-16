import { useEffect, useState } from "react"
import { getAllPokemons } from "../services"
import CardPokemon from "../components/CardPokemon"
import SearchBar from "../components/SearchBar"
import Spinner from "../components/Spinner"

const Home = () => {
    const [pokemons, setpokemons] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{

       const fetchpokemons = async ()=> {
        setLoading(true); 
           const pokemons = await  getAllPokemons()
          /*  console.log(pokemons) */
           setpokemons(pokemons)
           setLoading(false);
       } 

       fetchpokemons()
    },[])

  return (
    <>
     <SearchBar />
    <div className="flex gap-2 flex-wrap justify-center my-10 min-h-[500px] items-center">
        {loading ? (
            <Spinner /> 
        ) : (
            pokemons?.map((pokemon, i) => (
                <CardPokemon key={i} pokemon={pokemon} />
            ))
        )}
    </div>
</>
 
  )
}

export default Home