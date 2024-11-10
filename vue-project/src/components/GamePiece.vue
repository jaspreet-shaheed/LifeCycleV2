<script setup lang="ts">

import PieceData from "./PieceData";

const props = defineProps<{
  pieceData : PieceData
}>()


</script>

<template>
    <div class="container" @click="console.log('clicked'); $emit('clickSelect')">
        <div v-if="props.pieceData.isHuman" class="dot human" style="vertical-align: middle;" ></div>
        <div v-else class="dot ai" style="vertical-align: middle;" ></div>
    </div>
</template>

<style scoped>


.container {
    display: grid;
    place-items: center; /* Centers both horizontally and vertically */
}

.dot {
  height: 25px;
  width: 25px;
  margin: auto;
  border-radius: 50%;
  display: inline-block;
}

.human {
    background-color: green;
}

.ai {
    background-color:red
}

</style>