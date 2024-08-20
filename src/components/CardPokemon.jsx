/* eslint-disable react/prop-types */
import { colorByType } from "../helpers/colorType";
import { capitalizeFirstLetter } from "../helpers/capitalizeLetter";
import { formatId } from "../helpers/formatId";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { PokemonContext } from "../context/PokemonContext";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa";

const CardPokemon = ({ pokemon }) => {
  const { name, img, types, id, spriteFix } = pokemon;
  const { toggleFavoritePokemon, favoritePokemons } = useContext(PokemonContext);

  const colorBg = types[0].type.name;
  const imageUrl = img || spriteFix; 

  const isFavorite = favoritePokemons.some(fav => fav.id === pokemon.id);

  return (
    <div className="relative">
    <Link
      to={`/${name}`}
      className={`px-2 pb-4 flex flex-col items-center rounded w-[109px] h-[190px] justify-between border border-neutral-700 bg-gradient-to-b from-neutral-800 to-transparent ${colorByType[colorBg]} bg-opacity-10 hover:scale-105 hover:bg-opacity-20`}
    >
      <p className="text-start w-full text-gray-300 text-sm mt-2">{formatId(id)}</p>
      <div className="bg-gradient-to-b from-neutral-700 to-transparent rounded-full h-[70px] w-[70px] flex items-center justify-center bg-opacity-10">
        <img src={imageUrl} alt="imagen del pokemon" />
      </div>
      <p className="text-sm font-bold">{capitalizeFirstLetter(name)}</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {types.map((tipo, i) => (
          <p
            className={`${colorByType[tipo.type.name]} rounded-full px-1 text-sm`}
            key={i}
          >
            {tipo.type.name}
          </p>
        ))}
      </div>
    </Link>
    <button  
     onClick={() => toggleFavoritePokemon(pokemon)}
     className="absolute top-2 right-2 text-xl hover:scale-105" >
      {isFavorite ?  <FaHeart className="size-4 text-red-700"/> :  <CiHeart className="size-5 "/> }
   
    </button>
    </div>
  );
};

export default CardPokemon;