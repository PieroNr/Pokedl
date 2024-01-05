// StarRain.vue
<template>
  <div class="win">
    <img src="../assets/win.gif">

    <button class="btn btn-primary btn-lg" @click="$emit('continue')">Continuer</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "win-rain",
  props: {
    trigger: Boolean,
  },
  data() {
    return {
      isWin: false,
    };
  },
  watch: {
    trigger() {
      this.isWin = true;
    },
  },
});
</script>

<style scoped lang="scss">
.win {
  /* background with black overlay and 50% opacity and gif as background */
  background: rgba(0, 0, 0, 0.5) no-repeat center center fixed;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: apparition 1s ease-in-out;

  img {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    object-fit: contain;
    animation: apparition 1.8s ease-in-out;

  }

  button {
    position: absolute;
    bottom: 40px;
    background-color: #ffbe0f;
    color: white;
    font-size: 1.5rem;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 16px;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    width: 50%;
    text-decoration: none;
    text-align: center;
    animation: apparition 1.8s ease-in-out;

  }

  @keyframes apparition {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;

    }

  }
}
</style>
