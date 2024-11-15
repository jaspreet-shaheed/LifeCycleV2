<script setup lang="ts">

import PieceData from "./PieceData";

const props = defineProps<{
  pieceData : PieceData
}>()


</script>

<template>
    <div class="containsPiece" @click="$emit('clickSelect')" :class="'grow drag-el'" draggable 
        v-on:dragstart="(e:DragEvent) => $emit('dragBegin', e, props.pieceData.id) "
        v-on:dragover="$emit('dragOverPiece', props.pieceData.id)"
        >
        <div v-if="props.pieceData.isHuman" class="dot human" style="vertical-align: middle;"></div>
        <div v-else class="dot ai" style="vertical-align: middle;"></div>
    </div>
</template>

<style scoped>

.grow { 
  transition: all .2s ease-in-out; 
}

.grow:hover { 
  transform: scale(1.3); 
}

.containsPiece {
    display: grid;
    place-items: center; /* Centers both horizontally and vertically */
}

.dot {
  height: 30px;
  width: 30px;
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