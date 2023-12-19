import { createClient } from '@supabase/supabase-js'
import PokemonDataService from "./PokemonDataService.ts";


class SupabaseService {


    getClient() {
        const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
        const supabaseKey = process.env.VITE_SUPABASE_KEY || '';
        const supabase = createClient(supabaseUrl, supabaseKey);
        return supabase;
    }

    async insertAllPokemon() {
        const pokemonList = await PokemonDataService.getPokemonList();
        pokemonList.shift();
        const lastPokemonId = await this.getLastPokemonId();
        const index = pokemonList.findIndex((pokemon: any) => pokemon.pokedexId === lastPokemonId);
        const pokemonListToInsert = pokemonList.slice(index + 1, pokemonList.length);

        for (const pokemon of pokemonListToInsert) {
            const currentPokemon = await PokemonDataService.get(pokemon);
            const { data, error } = await this.getClient()
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
        const { data, error } = await this.getClient()
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
        const { data, error } = await this.getClient()
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

    async getRandomPokemonAndPokemonListUntilGen(gen: number | null = null) {
        const pokemonList = await this.getPokemonsUntilGen(gen);
        const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        return { pokemon: randomPokemon, pokemonList };
    }

    async getLastGenNumber() {
        const { data, error } = await this.getClient()
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
        const { data, error } = await this.getClient()
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
        const { data, error } = await this.getClient()
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