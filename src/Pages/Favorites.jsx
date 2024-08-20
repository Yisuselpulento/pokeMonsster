import { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import CardPokemon from "../components/CardPokemon";

const Favorites = () => {
  const { favoritePokemons } = useContext(PokemonContext);
  

  return (
    <div className="container mx-auto ">
      <Link 
        className="text-blue-600 hover:text-blue-700"
        to="/">
        Atrás
      </Link>

      <h1 className="text-2xl font-bold my-4">Pokémones Favoritos</h1>

      {favoritePokemons.length === 0 ? (
        <p>No tienes Pokémon favoritos aún.</p>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {favoritePokemons.map((pokemon) => (
            <CardPokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;