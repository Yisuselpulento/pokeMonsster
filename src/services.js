import axios from "axios"

export const getAllPokemons = async (currentPage, pokemonsPerPage) => {
    try {
        const offset = (currentPage - 1) * pokemonsPerPage;
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`)
            const numberPage = data.count
        const PokemonsInfo = await Promise.all(
            data.results.map(async (poke) => {
                const { data } = await axios.get(poke.url);
               /*  console.log(data)  */ 
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

/* export const getGlobalPokemons = async () => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")

        const PokemonsInfo = await Promise.all(
            data.results.map(async (poke) => {
                const { data } = await axios.get(poke.url);
              
              const { name,sprites,types, id  } = data 
                return {
                    id,
                    name,
                    img: sprites.versions["generation-v"]["black-white"].animated.front_default,
                    types
                }
            })
        );
       
        return PokemonsInfo
    } catch (error) {
        console.log(error)
    } 
} */

export const getPokemonDetails = async (poke) => {
    try {
        const {data : pokemon} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
      /*  console.log(pokemon)  */
        const {id, sprites, name, height, weight , types, stats} = pokemon

        return {
            id,
            name,
            types,
            height,
            weight,       
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