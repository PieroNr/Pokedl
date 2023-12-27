<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Header",
  props: {
    title: String,
  },
});
</script>

<template>
  <header>
    <div class="container">
      <h1 class="title">{{ title }}</h1>
    </div>
  </header>
</template>

<style scoped lang="scss">
  header {
    background-color: #ffbe0f;
    color: white;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 0 0 25px 25px;
  }

  .title {
    margin: 0;
    padding: 1rem;
  }
</style>