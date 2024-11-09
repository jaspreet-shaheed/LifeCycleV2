
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
        style="height: 30px; width:30px;"
        v-bind:class="(xCoord % 2 == 0 && yCoord % 2 == 0)?'piece':(xCoord % 2 == 0)?'yPath':(yCoord % 2 ==0)?'xPath':'nothing'  ">
        
        <div class="container">
           <hr style="vertical-align: middle; width:30px;" v-if="(yCoord % 2 == 0 && xCoord % 2 == 1)"/>

           <hr style="transform: rotate(90deg); width:30px;" v-if="(yCoord % 2 == 1 && xCoord % 2 == 0)"/>
        </div>

      </td>
    </tr>
  </table>
</template>


<style scoped>


.piece {
  border: 2px;
  border-style: solid;
}

.xPath {
}

.yPath {
}

.nothing {
}
</style>