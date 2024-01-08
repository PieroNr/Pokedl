<script lang="ts">
import Pokemon from "../types/Pokemon";

export default {
  props: {
    pokemon: Object as () => Pokemon | null,
    isWin: Boolean as () => boolean,
  },
  data() {
    return {
      definitions: [] as string[],
      initialPosition: [
        Math.random() < 0.5 ? Math.random() * 30 : 70 + Math.random() * 30, // Position horizontale aléatoire entre 0% et 30%
        Math.random() < 0.5 ? Math.random() * 30 : 70 + Math.random() * 30, // Position verticale aléatoire entre 0% et 30% ou entre 70% et 100%
      ] as number[],
      position: [50, 50] as number[], // Position actuelle
      widthPercentage: 300 as number, // Largeur initiale à 300%
      brightness: 0 as number,
    };
  },

  methods: {
    centerAndZoomOut() {
      this.position = [...this.initialPosition];
      if (this.widthPercentage > 95) {
        this.widthPercentage -= 5;
      }
    },

    handleGuess() {
      this.centerAndZoomOut();
    },

    win() {
      this.widthPercentage = 95;
      this.brightness = 100;
    },
  },

  mounted() {
    this.position = [...this.initialPosition];
  },
};
</script>

<template>
  <div class="shadow container">
    <div
        v-if="pokemon"
        class="shadow-container"
        :style="{
        background: 'url(' + pokemon.officialArtworkUrl + ')',
        backgroundSize: widthPercentage + '%',
        backgroundPosition: position[0] + '% ' + position[1] + '%',
        filter: 'brightness(' + brightness + '%) invert(0%)',

      }"
    >
    </div>
  </div>
</template>



<style scoped lang="scss">
.shadow {
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #e0e0e0;
    width: 75%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 10%;
    border: 0.5px solid #e0e0e0;

  }
}

</style>