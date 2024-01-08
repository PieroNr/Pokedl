<template>

  <div class="motus container">

    <div v-if="pokemon" class="motus-pokemon">

      <DifficultySelector :max-difficulty="maxDifficulty" @difficulty-updated="updateDifficulty" />
      <SearchBar :pokemon-list="currentPokemonList" @pokemon-selected="tryPokemon" :is-win="isWin"/>
      <TriedPokemonList :tried-pokemons="triedPokemons" :pokemon="pokemon" :gamemode="Gamemodes.MOTUS"/>

    </div>
  </div>
  <VictoryRain :trigger="isWin" v-if="isWin" @continue="Continue"/>
  </template>
  
  <script lang="ts">
  import {defineComponent} from "vue";
  import SupabaseService from "../services/SupabaseService.ts";
  import Pokemon from "../types/Pokemon.ts";
  import {Gamemodes} from "../enums/Gamemodes.ts";
  import SearchBar from "../components/SearchBar.vue";
  import TriedPokemonList from "../components/TriedPokemonList.vue";
  import DifficultySelector from "../components/DifficultySelector.vue";
  import VictoryRain from "../components/VictoryRain.vue";


  export default defineComponent({
    name: "tutorials-list",
    computed: {
      Gamemodes() {
        return Gamemodes
      }
    },
    components: {VictoryRain, DifficultySelector, TriedPokemonList, SearchBar},
    data() {
      return {
        pokemon: null as Pokemon | null,
        searchedPokemon: null as Pokemon | null,
        difficulty: 1 as number,
        maxDifficulty: 1 as number,
        currentPokemonList: [] as Pokemon[],
        filteredPokemonList: [] as Pokemon[],
        isWin: false as boolean,
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

      updateDifficulty(newDifficulty: number) {
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

      win(){
        this.isWin = true;
      },

      Continue(){
        this.isWin = false;
        this.refreshList();
        this.$router.push({ name: "Description" });
      },
      async tryPokemon(pokemon: Pokemon){
        this.searchTerm = pokemon.name;
        this.filteredPokemonList = [];

        this.searchedPokemon = await SupabaseService.getPokemonById(pokemon.pokedexId);
        this.triedPokemons.unshift(<Pokemon>this.searchedPokemon)
        if(pokemon.pokedexId == this.pokemon?.pokedexId){
          this.win();
        }
        this.searchTerm = "";

      }
    },

    async created() {
      this.maxDifficulty = await SupabaseService.getLastGenNumber();
      await this.getDailyPokemon();
    },



  });
  </script>
  
  <style scoped lang="scss">

  .motus {
    margin: 0 1rem;
    width: calc(100% - 2rem);
    overflow: hidden;

    &-pokemon {
      flex-flow: column;
      height: calc(100vh - 70px - 16px);
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }


  }

  </style>