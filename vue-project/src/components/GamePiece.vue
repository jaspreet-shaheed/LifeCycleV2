<script setup lang="ts">
import PieceData from './PieceData'
import { onMounted, watch } from 'vue'

const props = defineProps<{
  pieceData: PieceData
}>()

const getColor = function (): string {
  return props.pieceData.isHuman
    ? 'rgb(0, ' + (2 * props.pieceData.lifeStrength + 50) + ', 0)'
    : 'rgb(' + (2 * props.pieceData.lifeStrength + 50) + ', 0, 0)'
}

onMounted(() => {
  const el = document.getElementById(getId())!
  el.style.backgroundColor = getColor()
})

watch(props.pieceData, () => {
  const el = document.getElementById(getId())
  if (el) {
    el.style.backgroundColor = getColor()
  }
})

const getId = function () {
  return props.pieceData.id + '-piece'
}
</script>

<template>
  <div
    class="containsPiece"
    :class="'grow drag-el'"
    draggable
    v-on:dragstart="(e: DragEvent) => $emit('dragBegin', e, props.pieceData.id)"
    v-on:dragover="$emit('dragOverPiece', props.pieceData.id)"
  >
    <div class="dot" :id="getId()" style="vertical-align: middle"></div>
  </div>
</template>

<style scoped>
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.3);
}

.containsPiece {
  display: grid;
  place-items: center; /* Centers both horizontally and vertically */
}

.dot {
  height: 28px;
  width: 28px;
  margin: auto;
  border-radius: 50%;
  display: inline-block;
  border-style: solid;
  border-color: black;
}
</style>
