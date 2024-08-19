import { getEvolutionsData } from "../services";

const getEvolutions = async (evolutionInfo) => {
    const evolutions = [];
    let evolutionData = evolutionInfo.chain;
  
    do {
      const evoDetails = evolutionData["evolution_details"][0];
  
      evolutions.push({
        name: evolutionData.species.name,
        min_level: evoDetails?.min_level ?? 1,
      });
  
      evolutionData = evolutionData.evolves_to[0];
    } while (evolutionData);
  
    const promises = getEvolutionsData(evolutions);
  
    try {
      const responses = await Promise.allSettled(promises);
      assignInfoToEvolutions(responses, evolutions);
    } catch (err) {
      console.log(err);
    }
  
    return evolutions;
  };
  
  const assignInfoToEvolutions = (responses, evolutions) => {
    responses.forEach((response, index) => {
      if (response.status === "fulfilled") {
        evolutions[index].image =
          response.value.data.sprites.versions["generation-v"][
            "black-white"
          ].front_default;
        evolutions[index].pokemonInfo = response.value.data;
      }
    });
  };

  export {
    getEvolutions
  }