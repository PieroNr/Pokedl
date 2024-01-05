<!-- TriedPokemonList.vue -->

<template>

  <div class="tried-pokemon-list container">
    <div v-if="triedPokemons && triedPokemons.length > 0 && pokemon" class="tried-pokemon-list-container">
      <div v-for="triedPokemon in triedPokemons"  :key="triedPokemon.name" class="try">
        <div v-if="triedPokemon" class="try-list">

          <img class="spriteList" v-if="triedPokemon && triedPokemon.spriteUrl" :src="triedPokemon.spriteUrl"/>

          <span :style="{backgroundColor: triedPokemon.firstType.name == pokemon?.firstType.name ? '#7fc27f' : '#ff9393'}"><p class="prop">Type 1</p>{{ triedPokemon.firstType.name }}</span>
          <span :style="{backgroundColor: (triedPokemon.secondType && pokemon?.secondType && triedPokemon.secondType.name == pokemon?.secondType.name) || (!triedPokemon.secondType && !pokemon?.secondType) ? '#7fc27f' : '#ff9393'}"><p class="prop">Type 2</p>{{ triedPokemon.secondType ? triedPokemon.secondType.name : 'Aucun' }}</span>
          <span :style="{backgroundColor: triedPokemon.color == pokemon?.color ? '#7fc27f' : '#ff9393'}"><p class="prop">Couleur</p>{{ triedPokemon.color }}</span>
          <span :style="{backgroundColor: (triedPokemon.habitation && triedPokemon.habitation == pokemon?.habitation) || (!triedPokemon.habitation && !pokemon?.habitation) ? '#7fc27f' : '#ff9393'}"><p class="prop">Habitat</p>{{ triedPokemon.habitation ? triedPokemon.habitation : '?' }}</span>
          <span :style="{backgroundColor: triedPokemon.generation == pokemon?.generation ? '#7fc27f' : '#ff9393'}"><p class="prop">Gen</p>{{ triedPokemon.generation }}</span>
          <span :style="{backgroundColor: triedPokemon.height == pokemon?.height ? '#7fc27f' : Math.abs(triedPokemon.height-pokemon?.height) <= 0.3 ? '#ffc954' : '#ff9393'}"><p class="prop">Taille</p>{{ triedPokemon.height < pokemon?.height ? triedPokemon.height + 'm⇧' : triedPokemon.height > pokemon?.height ? triedPokemon.height + 'm⇩' : triedPokemon.height +'m' }}</span>
          <span :style="{backgroundColor: triedPokemon.weight == pokemon?.weight ? '#7fc27f' : Math.abs(triedPokemon.weight-pokemon?.weight) <= 5 ? '#ffc954' : '#ff9393'}"><p class="prop">Poids</p>{{ triedPokemon.weight < pokemon?.weight ? triedPokemon.weight + 'kg⇧' : triedPokemon.weight > pokemon?.weight ? triedPokemon.weight + 'kg⇩' : triedPokemon.weight +'kg' }}</span>
          <span :style="{backgroundColor: triedPokemon.evolutionState == pokemon?.evolutionState ? '#7fc27f' : '#ff9393'}"><p class="prop">Stade Evol</p>{{ triedPokemon.evolutionState < pokemon?.evolutionState ? triedPokemon.evolutionState + '⇧' : triedPokemon.evolutionState > pokemon?.evolutionState ? triedPokemon.evolutionState + '⇩' : triedPokemon.evolutionState }}</span>
          <span :style="{backgroundColor: triedPokemon.isFullEvolution == pokemon?.isFullEvolution ? '#7fc27f' : '#ff9393'}"><p class="prop">Full Evol</p>{{ triedPokemon.isFullEvolution ? 'yes' : 'no' }}</span>
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
  margin: 0 auto;
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
  justify-content: center;
  margin: 0;
  gap: 6px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 0 0 10px 0;
  border: 1px solid #b6b6b6;

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
    border: 1px solid #e3e3e3;
    color: white;
    font-weight: bolder;
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
    }
  }

  img {
    box-shadow: none;
    background-color: #ffffff;
    object-fit: contain;
    width: calc(100px * 3 + 6px * 2);
    border-radius: 15px 15px 0 0;
    height: 100px;
  }
}

</style>
