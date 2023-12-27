<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="searchTerm"
        @input="filterPokemonList"
        placeholder="Enter a Pokemon name"
    />
    <ul v-if="showSuggestions" class="suggestions-list">
      <li v-for="suggestion in suggestions" :key="suggestion.pokedexId" @click="selectSuggestion(suggestion)">
        <img class="spriteList" v-if="suggestion && suggestion.spriteUrl" :src="suggestion.spriteUrl"/>
        <p>{{ suggestion.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Pokemon from "../types/Pokemon";

export default {
  props: {
    pokemonList: Array as () => Pokemon[],
  },
  data() {
    return {
      searchTerm: "",
      showSuggestions: false,
      suggestions: [] as Pokemon[],
    };
  },
  methods: {
    filterPokemonList() {
      if (this.pokemonList === undefined) return;

      this.suggestions = this.pokemonList.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );

      // Show/hide suggestions based on the presence of search results
      this.showSuggestions = this.suggestions.length > 0;
      console.log(this.suggestions);
    },
    selectSuggestion(selectedPokemon: Pokemon) {
      // Handle the selection of a suggestion
      // You may want to emit an event or perform some action
      this.$emit("pokemon-selected", selectedPokemon);

      // Reset search term and hide suggestions
      this.searchTerm = "";
      this.showSuggestions = false;
    },
  },
};
</script>

<style scoped lang="scss">
 ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
  }

  li {
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;

  }

  li:hover {
    background-color: #ffbe0f;
    color: white;
  }

  .search-bar {
    position: relative;
  }

  .suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #ececec;
    color: white;
    border-radius: 0 0 25px 25px;

    p{
      margin-left: 10px;
      color: #333333;
    }
  }

  .spriteList {
    width: 50px;
    height: 50px;
  }
</style>
