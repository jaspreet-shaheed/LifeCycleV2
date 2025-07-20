<script setup lang="ts">
import Title from './components/TitleBanner.vue'
import Grid from './components/GameGrid.vue'
import PieceData from './components/PieceData'
import PieceInfo from './components/PieceInfo.vue'
import { onMounted, ref } from 'vue'
import { pathStore, direction } from './main'

const human1 = ref(new PieceData(1, true, 0, 0))
const human2 = ref(new PieceData(2, true, 0, 0))
const human3 = ref(new PieceData(3, true, 0, 0))

const aiPiece1 = ref(new PieceData(4, false, 50, 0))
const aiPiece2 = ref(new PieceData(5, false, 50, 0))
const aiPiece3 = ref(new PieceData(6, false, 50, 0))

const pieceLocations: [PieceData, number, number][] = []

pieceLocations.push([human1.value as PieceData, 0, 0])
pieceLocations.push([human2.value as PieceData, 6, 0])
pieceLocations.push([human3.value as PieceData, 12, 0])

pieceLocations.push([aiPiece1.value as PieceData, 0, 12])
pieceLocations.push([aiPiece2.value as PieceData, 6, 12])
pieceLocations.push([aiPiece3.value as PieceData, 12, 12])

const selectedPiece = ref(-1)
const selectPiece = function (pieceId: number) {
  selectedPiece.value = pieceId
}

const getPiece = (pieceId: number) => pieceLocations.find((p) => p[0].id === pieceId)?.[0] ?? null

const getPieceLocation = (pieceId: number) => pieceLocations.find((p) => p[0].id === pieceId)

const tick = function (): void {
  pieceLocations.forEach((pl) => pl[0].tick())
  const nextMoves: [number, [number, number]][] = getStore().getNextMoves
  nextMoves.forEach((el) => {
    const pl = getPieceLocation(el[0])!
    if (pl[0].readyToMove()) {
      pl[0].move()
      pl[1] = el[1][0]
      pl[2] = el[1][1]
      getStore().makeMove(pl[0].id)
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
    <div class="container my-5">
      <Title msg="LifeCycle" style="text-align: center" />
    </div>

    <div class="container text-center">
      <div class="row">
        <div class="col">
          <Grid :squares="7" :pieces="pieceLocations" @piece-selected="selectPiece"></Grid>
        </div>
        <div class="col">
          <PieceInfo :selected-piece="getPiece(selectedPiece)"></PieceInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
