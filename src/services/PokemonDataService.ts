import PokemonService from "./PokemonService";
import PokemonSpeciesService from "./PokemonSpeciesService";
import PokemonColorService from "./PokemonColorsService";
import PokemonHabitatService from "./PokemonHabitatService";
import PokemonGenService from "./PokemonGenService.ts";
import PokemonCardService from "./PokemonCardService.ts";
import Pokemon from "../../../Pokedl-admin/types/Pokemon";
import Description from "../../../Pokedl-admin/types/Description";
import Type from "../../../Pokedl-admin/types/Type.ts";
import {AxiosResponse} from "axios";


class PokemonDataService {
    async get(pokemonData: any) {
        try {
            const pokedexId: number = pokemonData.pokedexId;
            const nameId: string = pokemonData.name.en.toLowerCase().replace("♀", "-f").replace("♂", "-m").replace("'", "").replace(". ", "-").replace(" ", "-");
            console.log(nameId, pokedexId);
            const name: string = pokemonData.name.fr;

            const firstType: Type = {
                name: pokemonData.types[0].name,
                imageUrl: pokemonData.types[0].image,
            };
            const secondType: Type | null = pokemonData.types[1] ? {
                name: pokemonData.types[1].name,
                imageUrl: pokemonData.types[1].image,
            } : null;

            let evolutionState: number = 1;
            let isFullEvolution: boolean = true;
            if(pokemonData.evolution) {
                const evolution: { state: number; isFullEvolution: boolean } = this.calculateEvolutionState(pokemonData.evolution);
                evolutionState = evolution.state;
                isFullEvolution = evolution.isFullEvolution;
            }

            const height: number = parseFloat(pokemonData.height.split("m")[0].replace(",",".")).toFixed(1);
            const weight: number = parseFloat(pokemonData.weight.split("kg")[0].replace(",",".")).toFixed(1);
            const generation: number = pokemonData.generation;


            const speciesResponse: AxiosResponse = await PokemonSpeciesService.get(pokedexId);
            const pokemonResponse: AxiosResponse = await PokemonSpeciesService.getPokemon(pokedexId);
            const colorResponse: AxiosResponse = await PokemonColorService.get(speciesResponse.data.color.url.split("/")[6]);

            const cardResponse: AxiosResponse = await PokemonCardService.get(pokemonData.name.en.toLowerCase().replace("♀", "").replace("♂", ""));

            const color: string = colorResponse.data.names.find((name: any) => name.language.name === "fr").name;

            let habitat: string | null = null;
            if (speciesResponse.data.habitat) {
                const habitatResponse: AxiosResponse = await PokemonHabitatService.get(speciesResponse.data.habitat.url.split("/")[6]);
                habitat = habitatResponse.data.names.find((name: any) => name.language.name === "fr").name;
            }

            const description: Description[] = speciesResponse.data.flavor_text_entries
                .filter((description: any) => description.language.name.includes("fr"))
                .map((description: any) => ({
                    flavor_text: description.flavor_text,
                    versionName: description.version.name,
                }));

            const spriteUrl: string = pokemonResponse.data.sprites.front_default;
            const officialArtworkUrl: string = pokemonResponse.data.sprites.other["official-artwork"].front_default;
            const cardUrl: string = cardResponse.data.data[Math.floor(Math.random() * cardResponse.data.data.length)].images.large;

            const pokemon: Pokemon = {
                name,
                description,
                pokedexId: pokedexId,
                firstType: firstType,
                secondType: secondType,
                habitation: habitat,
                color: color,
                evolutionState,
                isFullEvolution,
                height,
                weight,
                generation,
                spriteUrl,
                officialArtworkUrl,
                cardUrl,
            };
            return pokemon;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private calculateEvolutionState(evolutionResponse: any | null): { state: number; isFullEvolution: boolean } {
        if(!evolutionResponse) return { state: 1, isFullEvolution: true };
        const state = evolutionResponse.pre ? evolutionResponse.pre.length + 1 : 1;
        const isFullEvolution = !evolutionResponse.next
        return { state, isFullEvolution };


    }

    async getRandomPokemonUntilGen(gen: number | null = null) {
        try {
            let pokemonList: any[] = [];

            if (gen === null) {
                pokemonList = await this.getPokemonList();
            } else {
                const promises = [];

                for (let i = 0; i < gen; i++) {
                    promises.push(this.getPokemonList(i + 1));
                }

                const responses = await Promise.all(promises);

                for (const response of responses) {
                    if (response) {
                        pokemonList = pokemonList.concat(response);
                    }
                }
            }

            const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];

            return { pokemon: await this.get(randomPokemon), pokemonList };

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    checkIfListInCache(gen: number | null = null) {
        if (gen === null) {
            return localStorage.getItem("pokemonList");
        } else {
            return localStorage.getItem(`pokemonList-${gen}`);
        }
    }
    async getPokemonList(gen: number | null = null) {
        const pokemonToSkipId = [122, 413, 439, 772,785,786,787,788,866,892,905,984,985,986,987,988,989,990,991,992,993,994,995,1005,1006,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018];
        try {
            let pokemonResponse: AxiosResponse;
            if(gen === null){
                const dataInCache = this.checkIfListInCache();
                if (dataInCache) {
                    console.log("All gen in cache");

                    return JSON.parse(dataInCache).filter((pokemon: any) => !pokemonToSkipId.includes(pokemon.pokedexId));
                } else {
                    pokemonResponse = await PokemonService.getAll();
                    localStorage.setItem("pokemonList", JSON.stringify(pokemonResponse.data));
                }
            } else {
                const dataInCache = this.checkIfListInCache(gen);
                if (dataInCache) {
                    console.log("gen " + gen + " in cache");
                    return JSON.parse(dataInCache).filter((pokemon: any) => !pokemonToSkipId.includes(pokemon.pokedexId));
                } else {
                    pokemonResponse = await PokemonGenService.get(gen);
                    localStorage.setItem(`pokemonList-${gen}`, JSON.stringify(pokemonResponse.data));
                }
            }

            return pokemonResponse.data.filter((pokemon: any) => !pokemonToSkipId.includes(pokemon.pokedexId));
        } catch (error) {
            console.error(error);
            throw error;
        }


    }
}

export default new PokemonDataService();
