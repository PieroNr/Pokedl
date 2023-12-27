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

      this.suggestions = this.pokemonList.filter((pokemon: Pokemon | undefined) =>
          pokemon?.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );

      // Show/hide suggestions based on the presence of search results
      this.showSuggestions = this.suggestions.length > 0;
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

<style scoped>
/* Styles remain the same */
</style>
