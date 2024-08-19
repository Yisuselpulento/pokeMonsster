import { PokemonContext } from "../context/PokemonContext";
import CardPokemon from "../components/CardPokemon";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useContext } from "react";

const Home = () => {
    const {
        showPokemons,
        loading,
        numberPages,
        currentPage,
        handlePageChange,
        searchTerm,
        handleSearchPokemon,
    } = useContext(PokemonContext);

    return (
        <>
            <SearchBar
                searchTerm={searchTerm}
                handleSearchPokemon={handleSearchPokemon}
            />
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
                        {showPokemons?.map((pokemon, i) => (
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
    );
};

export default Home;