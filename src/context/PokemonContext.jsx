import { createContext, useState, useEffect } from "react";
import { getAllPokemons } from "../services";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [globalPokemons, setGlobalPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [showPokemons, setShowPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numberPages, setNumberPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const pokemonsPerPage = 51;
    const [favoritePokemons, setFavoritePokemons] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            const { PokemonsInfo } = await getAllPokemons();
            setGlobalPokemons(PokemonsInfo);
            setFilteredPokemons(PokemonsInfo);
            setNumberPages(Math.ceil(PokemonsInfo.length / pokemonsPerPage));
            setLoading(false);
        };

        fetchPokemons();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = globalPokemons.filter(poke => poke.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredPokemons(filtered);
            setNumberPages(Math.ceil(filtered.length / pokemonsPerPage));
            setCurrentPage(1);
        } else {
            setFilteredPokemons(globalPokemons);
            setNumberPages(Math.ceil(globalPokemons.length / pokemonsPerPage));
        }
    }, [searchTerm, globalPokemons]);

    useEffect(() => {
        const offset = (currentPage - 1) * pokemonsPerPage;
        const pokemonsToShow = filteredPokemons.slice(offset, offset + pokemonsPerPage);
        setShowPokemons(pokemonsToShow);
    }, [currentPage, filteredPokemons]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchPokemon = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleFavoritePokemon = (pokemon) => {
        setFavoritePokemons((prevFavorites) => {
            if (prevFavorites.find((fav) => fav.id === pokemon.id)) {
                return prevFavorites.filter((fav) => fav.id !== pokemon.id);
            } else {
                return [...prevFavorites, pokemon];
            }
        });
    };

    return (
        <PokemonContext.Provider
            value={{
                globalPokemons,
                filteredPokemons,
                showPokemons,
                loading,
                numberPages,
                currentPage,
                searchTerm,
                handlePageChange,
                handleSearchPokemon,
                toggleFavoritePokemon,
                favoritePokemons
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};