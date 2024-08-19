import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import CardPokemon from "../components/CardPokemon";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

const Home = () => {
    const { showPokemons, loading } = useContext(PokemonContext);

    return (
        <>
            <SearchBar />
            <div className="flex gap-2 flex-wrap justify-center flex-col my-10 min-h-[500px] items-center">
                <Pagination />
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex gap-2 flex-wrap justify-center min-h-[500px]">
                        {showPokemons?.map((pokemon, i) => (
                            <CardPokemon key={i} pokemon={pokemon} />
                        ))}
                    </div>
                )}
                <Pagination />
            </div>
        </>
    );
};

export default Home;