// StarRain.vue
<template>
  <div class="win">
    <img src="../assets/win.gif">

    <button class="btn btn-primary btn-lg" @click="$emit('continue')">Continuer</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faStar)

export default defineComponent({
  name: 'VictoryRain',
  components: {
    FontAwesomeIcon,
  },
  props: {
    trigger: Boolean,
  },
  setup(props) {
    const stars = ref([]);

    const generateStars = () => {
      for (let i = 0; i < 100; i++) {
        stars.value.push({
          id: i,
          top: Math.random() * -110,
          left: Math.random() * 100,
          width: Math.random() * 20 + 20,
        });

      }
    };

    const clearStars = () => {
      stars.value = [];
    };

    onMounted(() => {
      if (props.trigger) {
        generateStars();
        setInterval(() => {
          clearStars();

        }, 3000);
      }

    });

    onUnmounted(() => {
      clearStars();
    });

    return {
      stars,
    };
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
