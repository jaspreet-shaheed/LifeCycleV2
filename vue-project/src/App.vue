<script setup lang="ts">
import Title from './components/TitleBanner.vue'
import Grid from './components/GameGrid.vue'
import PieceData from './components/PieceData'
import { onMounted, ref } from 'vue'
import { pathStore, direction } from './main'

const human1 = new PieceData(1, true, 0, 0)
const human2 = new PieceData(2, true, 0, 0)
const human3 = new PieceData(3, true, 0, 0)

const aiPiece1 = new PieceData(4, false, 0, 0)
const aiPiece2 = new PieceData(5, false, 0, 0)
const aiPiece3 = new PieceData(6, false, 0, 0)

const pieceLocations: [PieceData, number, number][] = []

pieceLocations.push([human1, 0, 0])
pieceLocations.push([human2, 6, 0])
pieceLocations.push([human3, 12, 0])

pieceLocations.push([aiPiece1, 0, 12])
pieceLocations.push([aiPiece2, 6, 12])
pieceLocations.push([aiPiece3, 12, 12])

const selectedPiece = ref(-1)
const selectPiece = (pieceId: number) => {
  selectedPiece.value = pieceId
}

const getPieceLocation = (pieceId: number) => pieceLocations.find((p) => p[0].id === pieceId)

const getDirection = function (x1: number, y1: number, x2: number, y2: number): direction {
  if (x1 - x2 === 2) {
    return direction.left
  } else if (x1 - x2 === -2) {
    return direction.right
  } else if (y1 - y2 === 2) {
    return direction.up
  } else if (y1 - y2 === -2) {
    return direction.down
  }
  throw new Error("Couldn't find direction " + x1 + ',' + y1 + ',' + x2 + ',' + y2)
}

const tick = function (): void {
  pieceLocations.forEach((pl) => pl[0].tick())
  const nextMoves: [number, [number, number]][] = getStore().getNextMoves
  nextMoves.forEach((el) => {
    const pl = getPieceLocation(el[0])!
    if (pl[0].readyToMove()) {
      console.log('Ready to move', pl[0].id)
      console.log('From (' + pl[1] + ',' + pl[2] + ') to (' + el[1][0] + ',' + el[1][1] + ')')
      const dir = getDirection(pl[1], pl[2], el[1][0], el[1][1])
      pl[0].move()
      pl[1] = el[1][0]
      pl[2] = el[1][1]
      getStore().makeMove(pl[0].id)

      console.log('Setting direction for piece: ' + pl[0].id + ' ' + dir)
      getStore().updateDirection(pl[0].id, dir)
    }
  })
}

let storeReady: boolean = false
function getStore() {
  return storeReady
    ? pathStore()
    : {
        allPaths: [],
        getNextMoves: [],
        makeMove: (_: number) => {},
        getDirections: [],
        updateDirection: (_: number, _d: direction) => {},
      }
}

onMounted(() => {
  storeReady = true
  window.setInterval(tick, 50)
})
</script>

<script lang="ts"></script>

<template>
  <div>
    <div class="wrapper">
      <Title msg="The LifeCycle Game" style="text-align: center" />
    </div>

    <div id="wrapper">
      <div id="left">
        <Grid :squares="7" :pieces="pieceLocations" @piece-selected="selectPiece"></Grid>
      </div>
      <div id="right"></div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

#wrapper {
  display: flex;
}

#left {
  flex: 0 0 65%;
}

#right {
  flex: 1;
}
</style>
