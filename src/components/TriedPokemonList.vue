<!-- TriedPokemonList.vue -->

<template>

  <div class="tried-pokemon-list container">
    <div v-if="triedPokemons && triedPokemons.length > 0 && pokemon" class="tried-pokemon-list-container">
      <div v-for="triedPokemon in triedPokemons"  :key="triedPokemon.name" class="try" :style="{height: gamemode==Gamemodes.MOTUS ? '425px' : '122px'}">
        <div class="box-inner">
        <div v-if="triedPokemon && triedPokemon.officialArtworkUrl" class="try-list box-front" :style="{height: gamemode==Gamemodes.MOTUS ? '425px' : '122px'}">
          <img class="spriteList-white" :src="triedPokemon.officialArtworkUrl" alt="sprite" />
        </div>
        <div v-if="triedPokemon" class="try-list box-back" :style="{backgroundColor: gamemode!=Gamemodes.MOTUS ? triedPokemon.pokedexId == pokemon.pokedexId ? '#7fc27f' : '#ff9393' : 'transparent'}">

          <img class="spriteList" v-if="triedPokemon && triedPokemon.spriteUrl" :src="triedPokemon.spriteUrl" alt="sprite" />

          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.firstType.name == pokemon?.firstType.name ? '#7fc27f' : '#ff9393'}"><p class="prop">Type 1</p>{{ triedPokemon.firstType.name }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: (triedPokemon.secondType && pokemon?.secondType && triedPokemon.secondType.name == pokemon?.secondType.name) || (!triedPokemon.secondType && !pokemon?.secondType) ? '#7fc27f' : '#ff9393'}"><p class="prop">Type 2</p>{{ triedPokemon.secondType ? triedPokemon.secondType.name : 'Aucun' }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.color == pokemon?.color ? '#7fc27f' : '#ff9393'}"><p class="prop">Couleur</p>{{ triedPokemon.color }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: (triedPokemon.habitation && triedPokemon.habitation == pokemon?.habitation) || (!triedPokemon.habitation && !pokemon?.habitation) ? '#7fc27f' : '#ff9393'}"><p class="prop">Habitat</p>{{ triedPokemon.habitation ? triedPokemon.habitation : '?' }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.generation == pokemon?.generation ? '#7fc27f' : '#ff9393'}"><p class="prop">Gen</p>{{ triedPokemon.generation }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.height == pokemon?.height ? '#7fc27f' : Math.abs(triedPokemon.height-pokemon?.height) <= 0.3 ? '#ffc954' : '#ff9393'}"><p class="prop">Taille</p>{{ triedPokemon.height < pokemon?.height ? triedPokemon.height + 'm⇧' : triedPokemon.height > pokemon?.height ? triedPokemon.height + 'm⇩' : triedPokemon.height +'m' }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.weight == pokemon?.weight ? '#7fc27f' : Math.abs(triedPokemon.weight-pokemon?.weight) <= 5 ? '#ffc954' : '#ff9393'}"><p class="prop">Poids</p>{{ triedPokemon.weight < pokemon?.weight ? triedPokemon.weight + 'kg⇧' : triedPokemon.weight > pokemon?.weight ? triedPokemon.weight + 'kg⇩' : triedPokemon.weight +'kg' }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.evolutionState == pokemon?.evolutionState ? '#7fc27f' : '#ff9393'}"><p class="prop">Stade Evol</p>{{ triedPokemon.evolutionState < pokemon?.evolutionState ? triedPokemon.evolutionState + '⇧' : triedPokemon.evolutionState > pokemon?.evolutionState ? triedPokemon.evolutionState + '⇩' : triedPokemon.evolutionState }}</span>
          <span v-if="gamemode==Gamemodes.MOTUS" :style="{backgroundColor: triedPokemon.isFullEvolution == pokemon?.isFullEvolution ? '#7fc27f' : '#ff9393'}"><p class="prop">Full Evol</p>{{ triedPokemon.isFullEvolution ? 'yes' : 'no' }}</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Pokemon from "../types/Pokemon";
import {Gamemodes} from "../enums/Gamemodes.ts";

export default {
  computed: {
    Gamemodes() {
      return Gamemodes
    }
  },
  props: {
    triedPokemons: Array as () => Pokemon[],
    pokemon: Object as () => Pokemon | null,
    gamemode: Number as () => Gamemodes,
  },

};
</script>

<style scoped lang="scss">

.tried-pokemon-list {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  border-top: 1px solid #9a9a9a;
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  &-container {
    overflow-y: scroll;
    height: 100%;
  }

}

.try {
  margin: 25px 0;
  perspective: 1000px;
  display: flex;
  justify-content: center;

  .box-inner {
    width: calc(100% - 10px);
    height: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
  }
  .box-inner {
    animation: rotation 1.5s;
    animation-fill-mode: forwards;
  }

  @keyframes rotation {

    to {
      transform: rotateY(180deg);
    }

  }

  .box-front{
    background-color: #e0e0e0;
    width: 100%;

  }

  .box-front,
  .box-back {
    position: absolute;
    backface-visibility: hidden;
    width: 100%;
  }


  .box-back {
    transform: rotateY(180deg);
  }

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
  padding: 10px 0 10px 0;
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

  .spriteList {
    box-shadow: none;
    object-fit: contain;
    width: calc(100px * 3 + 6px * 2);
    border-radius: 15px 15px 0 0;
    height: 100px;

  }

  .spriteList-white {
    object-fit: contain;
    width: 100%;
    height: 100%;
    filter: brightness(0) invert(1);
  }

}

</style>
