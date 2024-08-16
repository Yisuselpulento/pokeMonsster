import { useEffect, useState } from "react"
import { getAllPokemons } from "../services"
import CardPokemon from "../components/CardPokemon"
import SearchBar from "../components/SearchBar"
import Spinner from "../components/Spinner"
import Pagination from "../components/Pagination"

const Home = () => {
    const [pokemons, setpokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [numberPages, setNumberPages] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const pokemonsPerPage = 51

    useEffect( ()=>{

       const fetchpokemons = async ()=> {
        setLoading(true); 
           const pokemons = await  getAllPokemons(currentPage, pokemonsPerPage)
          /*  console.log(pokemons)  */
           setpokemons(pokemons.PokemonsInfo)
           setNumberPages(Math.ceil(pokemons.numberPage / pokemonsPerPage))
           setLoading(false);
       } 

       fetchpokemons()
    },[currentPage])

    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

  return (
    <>
     <SearchBar />
    <div className="flex gap-2 flex-wrap justify-center my-10 min-h-[500px] items-center">
          <Pagination 
                    numberPages={numberPages} 
                    currentPage={currentPage} 
                    onPageChange={handlePageChange} 
                    loading={loading}
                />
        {loading ? (
            <Spinner /> 
        ) : (
            pokemons?.map((pokemon, i) => (
                <CardPokemon key={i} pokemon={pokemon} />
            ))
        )}
        <Pagination 
                    numberPages={numberPages} 
                    currentPage={currentPage} 
                    onPageChange={handlePageChange} 
                    loading={loading}
                />
    </div>
</>
 
  )
}

export default Home