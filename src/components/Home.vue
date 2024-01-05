<script setup lang="ts">


</script>

<template>
<div class="home">
  <div class="header-home">
    <img class="header-home--img" src="../assets/favicon.jpg" alt="logo" width="200px">
    <h1 class="title">Pokedl</h1>
  </div>

  <div class="bottom-home">

    <a href="/Pokedl/Motus" class="btn-home">Jouer</a>
  </div>

</div>
</template>

<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
  }


  .header-home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 55%;
    background: rgb(255,190,15);
    background: linear-gradient(146deg, rgba(255,190,15,1) 1%, rgba(255,207,78,1) 100%);
    clip-path: polygon(0% 0%, 100% 0, 100% 80%, 0% 100%);

    &--img {
      filter: brightness(0) invert(1);
    }

    .title {
      position: relative;
      z-index: 1;
      margin: 0;
      color: #ffffff;
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  .bottom-home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 45%;
  }

  .btn-home {
    background-color: #ffbe0f;
    color: white;
    width: 100%;
    font-size: 2rem;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 16px;
    padding: 1rem;
    border-radius: 10px;
    border: none;
    width: 50%;
    text-decoration: none;
    text-align: center;

  }



</style>