<!-- TriedPokemonList.vue -->

<template>

  <div class="tried-pokemon-list container">
    <div v-if="triedPokemons && triedPokemons.length > 0 && pokemon" class="tried-pokemon-list-container">
      <div v-for="triedPokemon in triedPokemons"  :key="triedPokemon.name" class="try">
        <div v-if="triedPokemon" class="try-list">
          <img class="spriteList" v-if="triedPokemon && triedPokemon.spriteUrl" :src="triedPokemon.spriteUrl"/>
          <span :style="{color: triedPokemon.firstType.name == pokemon?.firstType.name ? 'green' : 'red'}"><p class="prop">Type 1</p>{{ triedPokemon.firstType.name }}</span>
          <span :style="{color: (triedPokemon.secondType && pokemon?.secondType && triedPokemon.secondType.name == pokemon?.secondType.name) || (!triedPokemon.secondType && !pokemon?.secondType) ? 'green' : 'red'}"><p class="prop">Type 2</p>{{ triedPokemon.secondType ? triedPokemon.secondType.name : 'Aucun' }}</span>
          <span :style="{color: triedPokemon.color == pokemon?.color ? 'green' : 'red'}"><p class="prop">Couleur</p>{{ triedPokemon.color }}</span>
          <span :style="{color: (triedPokemon.habitation && triedPokemon.habitation == pokemon?.habitation) || (!triedPokemon.habitation && !pokemon?.habitation) ? 'green' : 'red'}"><p class="prop">Habitat</p>{{ triedPokemon.habitation ? triedPokemon.habitation : '?' }}</span>
          <span :style="{color: triedPokemon.generation == pokemon?.generation ? 'green' : 'red'}"><p class="prop">Gen</p>{{ triedPokemon.generation }}</span>
          <span :style="{color: triedPokemon.height == pokemon?.height ? 'green' : 'red'}"><p class="prop">Taille</p>{{ triedPokemon.height < pokemon?.height ? triedPokemon.height + 'm⇧' : triedPokemon.height > pokemon?.height ? triedPokemon.height + 'm⇩' : triedPokemon.height +'m' }}</span>
          <span :style="{color: triedPokemon.weight == pokemon?.weight ? 'green' : 'red'}"><p class="prop">Poids</p>{{ triedPokemon.weight < pokemon?.weight ? triedPokemon.weight + 'kg⇧' : triedPokemon.weight > pokemon?.weight ? triedPokemon.weight + 'kg⇩' : triedPokemon.weight +'kg' }}</span>
          <span :style="{color: triedPokemon.evolutionState == pokemon?.evolutionState ? 'green' : 'red'}"><p class="prop">Stade Evol</p>{{ triedPokemon.evolutionState < pokemon?.evolutionState ? triedPokemon.evolutionState + '⇧' : triedPokemon.evolutionState > pokemon?.evolutionState ? triedPokemon.evolutionState + '⇩' : triedPokemon.evolutionState }}</span>
          <span :style="{color: triedPokemon.isFullEvolution == pokemon?.isFullEvolution ? 'green' : 'red'}"><p class="prop">Full Evol</p>{{ triedPokemon.isFullEvolution ? 'yes' : 'no' }}</span>
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
  margin: 0 1rem;
  gap: 20px;
  height: 500px;
  border-top: 1px solid #9a9a9a;

  &-container {
    overflow-y: scroll;
    height: 100%;
  }

}

.try {
  margin: 25px 0;

}

.try-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  gap: 6px;
  padding: 10px;

  span {
    width: 100px;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    text-align: center;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.5);

    .prop {
      font-size: 0.8rem;
      font-weight: bold;
      position: relative;
      color: #575757;
      background-color: #d3d3d3;
      width: 100px;
      transform: translateY(calc(-100%));
      margin: 0;
      padding:7px 0;
      border-radius: 15px 15px 0 0;
    }
  }

  img {
    box-shadow: none;
    background-color: transparent;
    object-fit: contain;
  }
}

</style>
