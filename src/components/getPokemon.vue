<template>
  <button @click="refreshList">Refresh List</button>
  <div v-if="pokemon">
    <div class="slidecontainer">
      <input type="range" min="1" :max="maxDifficulty" v-model="difficulty" class="slider" id="myRange" @input="refreshList">
      <p>Difficulty: {{ difficulty }}</p>
    </div>
    <label for="searchInput">Search by starting letter:</label>
    <input
        type="text"
        id="searchInput"
        v-model="searchTerm"
        @input="filterPokemonList"
        placeholder="Enter a letter"
    />
    <ul v-if="filteredPokemonList.length > 0">
      <li v-for="pokemon in filteredPokemonList" :key="pokemon.pokedexId" @click="tryPokemon(pokemon)">
        <img class="spriteList" v-if="pokemon && pokemon.spriteUrl" :src="pokemon.spriteUrl"/>
        <p>{{ pokemon.name }}</p>
      </li>
    </ul>
    <div v-if="triedPokemons.length > 0">
      <div v-for="triedPokemon in triedPokemons" :key="triedPokemon.name" class="try">
        <img class="spriteList" v-if="triedPokemon && triedPokemon.spriteUrl" :src="triedPokemon.spriteUrl"/>
        <span :style="{color: triedPokemon.firstType.name == pokemon?.firstType.name ? 'green' : 'red'}">{{ triedPokemon.firstType.name }}</span>
        <span :style="{color: (triedPokemon.secondType && pokemon?.secondType && triedPokemon.secondType.name == pokemon?.secondType.name) || (!triedPokemon.secondType && !pokemon?.secondType) ? 'green' : 'red'}">{{ triedPokemon.secondType ? triedPokemon.secondType.name : 'Aucun' }}</span>
        <span :style="{color: triedPokemon.color == pokemon?.color ? 'green' : 'red'}">{{ triedPokemon.color }}</span>
        <span :style="{color: (triedPokemon.habitation && triedPokemon.habitation == pokemon?.habitation) || (!triedPokemon.habitation && !pokemon?.habitation) ? 'green' : 'red'}">{{ triedPokemon.habitation ? triedPokemon.habitation : '?' }}</span>
        <span :style="{color: triedPokemon.generation == pokemon?.generation ? 'green' : 'red'}">{{ triedPokemon.generation }}</span>
        <span :style="{color: triedPokemon.height == pokemon?.height ? 'green' : 'red'}">{{ triedPokemon.height < pokemon?.height ? triedPokemon.height + 'm⇧' : triedPokemon.height > pokemon?.height ? triedPokemon.height + 'm⇩' : triedPokemon.height +'m' }}</span>
        <span :style="{color: triedPokemon.weight == pokemon?.weight ? 'green' : 'red'}">{{ triedPokemon.weight < pokemon?.weight ? triedPokemon.weight + 'kg⇧' : triedPokemon.weight > pokemon?.weight ? triedPokemon.weight + 'kg⇩' : triedPokemon.weight +'kg' }}</span>
        <span :style="{color: triedPokemon.evolutionState == pokemon?.evolutionState ? 'green' : 'red'}">{{ triedPokemon.evolutionState < pokemon?.evolutionState ? triedPokemon.evolutionState + '⇧' : triedPokemon.evolutionState > pokemon?.evolutionState ? triedPokemon.evolutionState + '⇩' : triedPokemon.evolutionState }}</span>
        <span :style="{color: triedPokemon.isFullEvolution == pokemon?.isFullEvolution ? 'green' : 'red'}">{{ triedPokemon.isFullEvolution ? 'yes' : 'no' }}</span>

      </div>



    </div>

  </div>
  </template>
  
  <script lang="ts">
  import {defineComponent} from "vue";
  import SupabaseService from "../services/SupabaseService";
  import Pokemon from "../types/Pokemon";
  import {Gamemodes} from "../enums/Gamemodes.ts";

  export default defineComponent({
    name: "tutorials-list",
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
  
      refreshList() {
        this.getDailyPokemon();
        ;
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
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }

  img.shadow{
    filter: brightness(0);
    width: 100px;
  }

  img.sprite{
    width: 100px;
  }
  img.spriteList{
    width: 50px;
  }

  img.card{
    width: 100px;
    filter: blur(5px);
  }

  ul {
    list-style-type: none;
    padding: 0;
    position: absolute;

  }

  li {
    background-color: #f1f1f1;
    border: 1px solid #d4d4d4;
    corner-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 1px 0;
    cursor: pointer;
  }

  li:hover {
    background-color: #ddd;
  }

  .try {
    display: flex;
    flex-direction: row;
    margin: 10px;
    align-items: center;
    gap: 10px;
  }

  </style>