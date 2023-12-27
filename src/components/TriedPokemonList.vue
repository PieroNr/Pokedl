<!-- TriedPokemonList.vue -->

<template>
  <div class="tried-pokemon-list container">
    <div v-if="triedPokemons && triedPokemons.length > 0 && pokemon">
      <div v-for="triedPokemon in triedPokemons"  :key="triedPokemon.name" class="try">
        <div v-if="triedPokemon" class="try-list">
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
  </div>
</template>

<script lang="ts">
import Pokemon from "../types/Pokemon";

export default {
  props: {
    triedPokemons: Array as () => Pokemon[],
    pokemon: Object as () => Pokemon | null,
  },

};
</script>

<style scoped lang="scss">

.tried-pokemon-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  gap: 20px;
}

.try-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  gap: 20px;
}

</style>
