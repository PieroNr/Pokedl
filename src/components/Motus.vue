<template>

  <div class="motus container">

    <div v-if="pokemon">

      <DifficultySelector :max-difficulty="maxDifficulty" @difficulty-updated="updateDifficulty" />
      <SearchBar :pokemon-list="currentPokemonList" @pokemon-selected="tryPokemon" />
      <TriedPokemonList :tried-pokemons="triedPokemons" :pokemon="pokemon" />

    </div>
  </div>
  </template>
  
  <script lang="ts">
  import {defineComponent} from "vue";
  import SupabaseService from "../services/SupabaseService";
  import Pokemon from "../types/Pokemon";
  import {Gamemodes} from "../enums/Gamemodes";
  import SearchBar from "./SearchBar.vue";
  import TriedPokemonList from "./TriedPokemonList.vue";
  import DifficultySelector from "./DifficultySelector.vue";
  import Header from "./Header.vue";


  export default defineComponent({
    name: "tutorials-list",
    components: {DifficultySelector, TriedPokemonList, SearchBar},
    data() {
      return {
        pokemon: null as Pokemon | null,
        searchedPokemon: null as Pokemon | null,
        difficulty: 1 as number,
        maxDifficulty: 1 as number,
        currentPokemonList: [] as Pokemon[],
        filteredPokemonList: [] as Pokemon[],
        searchTerm: "",
        triedPokemons: [] as Pokemon[],
      };
    },
    methods: {
      async getDailyPokemon() {
        try {
          const { pokemon, pokemonList } = await SupabaseService.getDailyPokemon(this.difficulty, Gamemodes.MOTUS);
          this.pokemon = pokemon;
          console.log(pokemon);
          this.currentPokemonList = pokemonList;
        } catch (error) {
          console.error("Error:", error);
        }
      },

      updateDifficulty(newDifficulty) {
        this.difficulty = newDifficulty;
        this.refreshList();
      },
  
      refreshList() {
        this.getDailyPokemon();
        this.filteredPokemonList = [];
        this.triedPokemons = [];

      },

      filterPokemonList() {
        const searchTermLower = this.searchTerm.toLowerCase();
        if(!searchTermLower) return (this.filteredPokemonList = []);
        this.filteredPokemonList = this.currentPokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTermLower)
        );
      },

      async tryPokemon(pokemon: Pokemon){
        this.searchTerm = pokemon.name;
        this.filteredPokemonList = [];

        this.searchedPokemon = await SupabaseService.getPokemonById(pokemon.pokedexId);
        this.triedPokemons.unshift(<Pokemon>this.searchedPokemon)
        this.searchTerm = "";

      }
    },
    async mounted() {
      this.maxDifficulty = await SupabaseService.getLastGenNumber();
      await this.getDailyPokemon();

    },
  });
  </script>
  
  <style>

  .motus {
  }

  </style>