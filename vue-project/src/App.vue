<script setup lang="ts">

import Title from './components/TitleBanner.vue'
import Grid from './components/GameGrid.vue'

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <Title msg="LifeCycle: The Game" style="text-align: center" />
    </div>
  
  <Grid :squares=9></Grid>
  </div>
</template>

<style scoped>

.container {
    display: grid;
    place-items: center; /* Centers both horizontally and vertically */
  }

header {
  line-height: 1.5;
}
</style>
