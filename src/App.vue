<script setup lang="ts">
import Header from "./components/Header.vue";

</script>

<template>
  <Header title="Pokedl" v-if="!$route.path.includes('Home')" />
<div class="container mt-3">
      <router-view />
</div>
</template>

<style scoped lang="scss">
.container{
  height: calc(100vh - 70px - 16px);
  display: flex;
  justify-content: center;
  overflow: hidden;}
</style>
