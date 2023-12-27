import {createClient, SupabaseClient} from '@supabase/supabase-js'
import PokemonDataService from "./PokemonDataService.ts";
import {Gamemodes} from "../enums/Gamemodes.ts";


class SupabaseService {

    client: SupabaseClient;

    constructor() {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
        const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';
        this.client = createClient(supabaseUrl, supabaseKey);
    }


    async insertAllPokemon() {
        const pokemonList = await PokemonDataService.getPokemonList();
        pokemonList.shift();
        const lastPokemonId = await this.getLastPokemonId();
        const index = pokemonList.findIndex((pokemon: any) => pokemon.pokedexId === lastPokemonId);
        const pokemonListToInsert = pokemonList.slice(index + 1, pokemonList.length);

        for (const pokemon of pokemonListToInsert) {
            const currentPokemon = await PokemonDataService.get(pokemon);
            const { data, error } = await this.client
                .from('pokemon')
                .insert(currentPokemon);
            if (error) {
                console.error(error);

            } else {
                console.log('succès:', data);
            }
        }
    }

    async getPokemons() {
        const { data, error } = await this.client
            .from('pokemon')
            .select('*');
        if (error) {
            console.error(error);
            throw error;
        } else {
            return data;
        }
    }

    async getPokemonsUntilGen(gen: number | null = null) {
        const { data, error } = await this.client
            .from('pokemon')
            .select('*')
            .lte('generation', gen);
        if (error) {
            console.error(error);
            throw error;
        } else {
            return data;
        }
    }

    async getDailyPokemon(difficulty: number | null = 1, gamemode: Gamemodes) {
        //get by difficulty et date
        const { data, error } = await this.client
            .from('dailyPokemon')
            .select('*')
            .eq('difficulty', difficulty)
            .eq('date', new Date().toISOString().slice(0, 10))
            .eq('gamemodeId', gamemode);

        if (error) {
            console.error(error);
            throw error;
        } else {
            const pokemon = await this.getPokemonById(data[0].pokemonId);
            const pokemonList = await this.getPokemonsUntilGen(difficulty);
            return { pokemon: pokemon, pokemonList };
        }
    }

    async getRandomPokemonAndPokemonListUntilGen(gen: number | null = null) {
        const pokemonList = await this.getPokemonsUntilGen(gen);
        const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        return { pokemon: randomPokemon, pokemonList };
    }

    async getLastGenNumber() {
        const { data, error } = await this.client
            .from('pokemon')
            .select('generation')
            .order('generation', { ascending: false })
            .limit(1);
        if (error) {
            console.error(error);
            throw error;
        } else {
            return data[0].generation;
        }
    }

    async getPokemonById(id: number) {
        const { data, error } = await this.client
            .from('pokemon')
            .select('*')
            .eq('pokedexId', id);
        if (error) {
            console.error(error);
            throw error;
        } else {
            return data[0];
        }
    }



    async getLastPokemonId() {
        const { data, error } = await this.client
            .from('pokemon')
            .select('pokedexId')
            .order('pokedexId', { ascending: false })
            .limit(1);
        if (error) {
            console.error(error);
            throw error;
        } else {
            console.log(data[0].pokedexId);
            return data[0].pokedexId;
        }

    }
}

export default new SupabaseService();