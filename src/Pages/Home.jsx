import { useEffect, useState } from "react"
import { getAllPokemons } from "../services"
import CardPokemon from "../components/CardPokemon"
import SearchBar from "../components/SearchBar"
import Spinner from "../components/Spinner"
import Pagination from "../components/Pagination"

const Home = () => {
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [showPokemons, setShowPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [numberPages, setNumberPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const pokemonsPerPage = 51

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true)
            const { PokemonsInfo  } = await getAllPokemons()
            setGlobalPokemons(PokemonsInfo)
            setFilteredPokemons(PokemonsInfo)
            setNumberPages(Math.ceil(PokemonsInfo.length / pokemonsPerPage))
            setLoading(false)
        }

        fetchPokemons()
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const filtered = globalPokemons.filter(poke => poke.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredPokemons(filtered)
            setNumberPages(Math.ceil(filtered.length / pokemonsPerPage))
            setCurrentPage(1)
        } else {
            setFilteredPokemons(globalPokemons)
            setNumberPages(Math.ceil(globalPokemons.length / pokemonsPerPage))
        }
    }, [searchTerm, globalPokemons])

    useEffect(() => {
        const offset = (currentPage - 1) * pokemonsPerPage
        const pokemonsToShow = filteredPokemons.slice(offset, offset + pokemonsPerPage)
        setShowPokemons(pokemonsToShow)
    }, [currentPage, filteredPokemons])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleSearchPokemon = (e) => {
        setSearchTerm(e.target.value)
    }
  return (
    <>
     <SearchBar 
     searchTerm={searchTerm}
     handleSearchPokemon={handleSearchPokemon} />
    <div className="flex gap-2 flex-wrap justify-center flex-col my-10 min-h-[500px] items-center">
           <Pagination 
                    numberPages={numberPages} 
                    currentPage={currentPage} 
                    onPageChange={handlePageChange} 
                    loading={loading}
                /> 
        {loading ? (
            <Spinner /> 
        ) : (
            <div className="flex gap-2 flex-wrap justify-center min-h-[500px]">
               { showPokemons?.map((pokemon, i) => (
                    <CardPokemon key={i} pokemon={pokemon} />
                ))}
            </div>
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