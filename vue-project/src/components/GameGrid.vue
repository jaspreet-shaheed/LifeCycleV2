
<script setup lang="ts">
  import * as _ from "lodash";
  import GamePiece from "./GamePiece.vue";
  import PieceData from "./PieceData.js";
  import { ref } from 'vue'

  const props = defineProps<{
    squares: number,
    pieces: [PieceData, number, number][]
  }>()

  const numbers = _.range(0, (props.squares * 2) -1 , 1);

  const hasPiece = function(x: number, y: number) : boolean {
    const findIndex = props.pieces.findIndex(p => p[1] === x && p[2] === y);
    return findIndex !== -1;
  }

  const getPieceData = function(x: number, y: number) : PieceData 
  {
    const findIndex = props.pieces.findIndex(p => p[1] === x && p[2] === y);
    if (findIndex !== -1){
      return props.pieces[findIndex][0];
    }  
    throw new Error('No piece here');
  }

  let selectedX = ref(-1);
  let selectedY = ref(-1);

</script>

<template>
  <table>
    <tr v-for="yCoord in numbers" 
      :key="yCoord">
      <td v-for="xCoord in numbers"
        :key="xCoord-yCoord-selectedX-selectedY"
        style="height: 30px; width:30px;"
        v-bind:class="(xCoord % 2 == 0 && yCoord % 2 == 0 && xCoord == selectedX && yCoord == selectedY)
          ?'selectedPiece'
          :(xCoord % 2 == 0 && yCoord % 2 == 0 )?'piece':'nothing'">
        
        <div class="container">
           <hr style="vertical-align: middle; width:30px;" v-if="(yCoord % 2 == 0 && xCoord % 2 == 1)"/>
           <hr style="transform: rotate(90deg); width:30px;" v-if="(yCoord % 2 == 1 && xCoord % 2 == 0)"/>
        </div>
        
        <div v-if="hasPiece(xCoord, yCoord)">
          <GamePiece :piece-data="getPieceData(xCoord, yCoord)" @click-select="selectedX = xCoord; selectedY = yCoord; console.log('event trigger');" ></GamePiece>
        </div>
        
      </td>
    </tr>
  </table>
</template>


<style scoped>

.selectedPiece {
  border: 2px;
  border-style: dotted;
  border-color: green;
}

.piece {
  border: 2px;
  border-style: solid;
  border-color: white;
}

</style>