<script setup lang="ts">

import Title from './components/TitleBanner.vue'
import Grid from './components/GameGrid.vue'

</script>

<template>
  <div class="container">
  <header>
    <div class="wrapper">
      <Title msg="LifeCycle Game v2" />
    </div>
  </header>
  
  <Grid :squares=9></Grid>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .container {
    display: grid;
    place-items: center; /* Centers both horizontally and vertically */
  }
}
</style>
