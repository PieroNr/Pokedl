<script lang="ts">
import Pokemon from "../types/Pokemon";

export default {
  props: {
    pokemon: Object as () => Pokemon | null,
  },
  data() {
    return {
      definitions: [] as string[],
    };
  },

  methods: {
    replaceNameByDotInDescription(description: string) {
      return description.replace(this.pokemon.name, "-----");
    },
  },

  mounted() {


  },


};
</script>

<template>
  <div class="definition container">
    <div v-if="pokemon" class="definition-container">
      <p>{{ replaceNameByDotInDescription(pokemon.description[0].flavor_text) }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.definition {
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

    p{
      font-size: 1.5rem;
      text-align: center;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
}

</style>