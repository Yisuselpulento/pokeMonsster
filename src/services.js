import axios from "axios"

export const getAllPokemons = async () => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?&limit=150")

        const PokemonsInfo = await Promise.all(
            data.results.map(async (poke) => {
                const { data } = await axios.get(poke.url);
               /*  console.log(data) */
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
}

export const getPokemonDetails = async (poke) => {
    try {
        const {data : pokemon} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        console.log(pokemon) 

        const {id, sprites, name, height, weight , types} = pokemon

        return {
            id,
            name,
            types,
            height,
            weight,
            img : sprites.versions["generation-v"]["black-white"].animated.front_default,
            img2 : sprites.other["official-artwork"].front_default
        }
    } catch (error) {
        console.log(error)
    } 
}