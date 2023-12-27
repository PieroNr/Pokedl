<!-- DifficultySelector.vue -->

<template>
  <div class="difficulty-selector">
    <label for="difficultyInput">Difficulté:</label>
    <input
        type="range"
        min="1"
        :max="maxDifficulty"
        v-model="difficulty"
        class="slider"
        id="difficultyInput"
        @input="updateDifficulty"
    />
    <p>Difficulty: {{ difficulty }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    maxDifficulty: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      difficulty: 1,
    };
  },
  methods: {
    updateDifficulty() {
      this.$emit("difficulty-updated", this.difficulty);
    },
  },
};
</script>

<style scoped>
/* Styles pour le composant DifficultySelector */
</style>
