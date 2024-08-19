import axios from "axios"
import { getEvolutions } from "./helpers/evolutionChain"

export const getAllPokemons = async (limit = 807, offset = 0) => {
    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            const numberPage = data.count
        const PokemonsInfo = await Promise.all(
            data.results.map(async (poke) => {
                const { data } = await axios.get(poke.url);
    
              const { name,sprites,types, id  } = data 
                return {
                    id,
                    spriteFix : sprites.front_default,
                    name,
                    img: sprites.versions["generation-v"]["black-white"].animated.front_default,
                    types
                }
            })
        );
       
        return {PokemonsInfo, numberPage}
    } catch (error) {
        console.log(error)
    } 
}


export const getPokemonDetails = async (poke) => {
    try {
        const {data : pokemon} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
     /*   console.log(pokemon)  */
       const { data: dataSpecies } = await axios.get(pokemon.species.url);
       const { data: dataEvolution } = await axios.get(
        dataSpecies.evolution_chain.url
      );

      const evolutions = await getEvolutions(dataEvolution);

        const {id, sprites, name, height, weight , types, stats} = pokemon

        return {
            id,
            name,
            types,
            height,
            weight, 
            evolutions,      
            sprites : [
                sprites.versions["generation-i"]["red-blue"].front_default,
                sprites.versions["generation-iii"]["emerald"].front_default,
                sprites.versions["generation-iii"]["firered-leafgreen"].front_default,
             sprites.versions["generation-v"]["black-white"].animated.front_default
            
            ],
            img : sprites.other["official-artwork"].front_default,
            stats : [
                {name: "Hp", stat : stats[0].base_stat },
                {name: "Atk", stat : stats[1].base_stat },
                {name: "Def", stat : stats[2].base_stat },
                {name: "SpA", stat : stats[3].base_stat },
                {name: "SpD", stat : stats[4].base_stat },
                {name: "SPD", stat : stats[5].base_stat },
            ]
        }
    } catch (error) {
        console.log(error)
    } 
}

export const getDescriptionPokemon = async (idPoke) => {

    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idPoke}`)
    const flavorTextEntry = data.flavor_text_entries.find(entry => entry.language.name === 'es')
    if (flavorTextEntry) {
        return flavorTextEntry.flavor_text;
      } else {
        return 'Descripción en español no disponible.';
      }

}

export const getCountersPokemon = async (idPoke) => {

    const {data} = await axios.get(`https://pokeapi.co/api/v2/type/${idPoke}`)
    return data.damage_relations

}

export const getEvolutionsData = (evolutions) => {
    return evolutions.map(
      async (evolution) =>
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.name}/`)
    );
  };