<script setup lang="ts">

import Title from './components/TitleBanner.vue'
import Grid from './components/GameGrid.vue'
import PieceData from './components/PieceData';

//const pieces : PieceData[] = [];

const human1 = new PieceData(1, true, 0, 0);
const human2 = new PieceData(2, true, 0, 0);
const human3 = new PieceData(3, true, 0, 0);

const aiPiece1 = new PieceData(4, false, 0, 0);
const aiPiece2 = new PieceData(5, false, 0, 0);
const aiPiece3 = new PieceData(6, false, 0, 0);

//pieces.push([human1, human2, human3, aiPiece1, aiPiece2, aiPiece3]);

const pieceLocations : [PieceData, number, number][] = [];

pieceLocations.push([human1, 0, 0]);
pieceLocations.push([human2, 6, 0]);
pieceLocations.push([human3, 12, 0]);

pieceLocations.push([aiPiece1, 0, 12]);
pieceLocations.push([aiPiece2, 6, 12]);
pieceLocations.push([aiPiece3, 12, 12]);



</script>

<template>
  <div>
    <div class="wrapper">
      <Title msg="LifeCycle: The Game" style="text-align: center" />
    </div>
  
  <Grid :squares=7 :pieces=pieceLocations ></Grid>
  </div>
</template>

<style scoped>


header {
  line-height: 1.5;
}
</style>
