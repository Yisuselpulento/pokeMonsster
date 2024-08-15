/* eslint-disable react/prop-types */
import { colorByType } from "../helpers/colorType"
import { capitalizeFirstLetter } from "../helpers/capitalizeLetter"
import { formatId } from "../helpers/formatId"
import { Link } from "react-router-dom"



const CardPokemon = ( {pokemon} ) => {
  const { name, img, types, id } = pokemon

  const colorBg = types[0].type.name
 

  return (
    <Link 
    to={`/${name}`}
    className={` px-2  pb-4 flex flex-col items-center rounded w-[155px] h-[230px] justify-between border border-neutral-700 bg-gradient-to-b from-neutral-800/100 to-transparent  bg-[${colorByType[colorBg]}] bg-opacity-5 hover:scale-105 hover:bg-opacity-20`}>
      <p className="text-start w-full text-gray-300 text-sm mt-2">{formatId(id)}</p>
      <div className="bg-gradient-to-b   from-neutral-700 to-transparent rounded-full h-[100px] w-[100px] flex items-center justify-center bg-opacity-10">
      <img src={img} className="scale-125" />
      </div>
      <p>{capitalizeFirstLetter(name)}</p>
    {  <div className="flex gap-2">
        {types.map((tipo,i) => (
          <p 
          className={`bg-[${colorByType[tipo.type.name]}]  rounded-full py-1 px-2`}
          key={i}>{tipo.type.name}</p>

        ) )}
      </div> }
    </Link>
  )
}

export default CardPokemon