
<script setup lang="ts">
import * as _ from "lodash";

const props = defineProps<{
  squares: number
}>()

const numbers = _.range(0, (props.squares * 2) -1 , 1);


</script>

<template>
  <table>
    <tr v-for="yCoord in numbers" 
      :key="yCoord">
      <td v-for="xCoord in numbers" 
        :key="xCoord-yCoord"
        v-bind:class="(xCoord % 2 == 0 && yCoord % 2 == 0)?'piece':(xCoord % 2 == 0)?'yPath':(yCoord % 2 ==0)?'xPath':'nothing'  ">
        ({{ xCoord }},{{ yCoord }})
      </td>
    </tr>
  </table>
</template>


<style scoped>

.piece {
  border-style: solid;
}

.xPath {
  width: 100%;
  height: 2px;
  background-color: black;
}

.yPath {
}

.nothing {
}
</style>