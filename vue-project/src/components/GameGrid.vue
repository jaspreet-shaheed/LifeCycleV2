<script setup lang="ts">
import GamePiece from './GamePiece.vue'
import PieceData from './PieceData.js'
import { onMounted, reactive, ref } from 'vue'
const emit = defineEmits(['pieceSelected'])

const props = defineProps<{
  squares: number
  pieces: [PieceData, number, number][]
}>()

import { pathStore } from './../main'

let storeReady: boolean = false
function getStore() {
  return storeReady
    ? pathStore()
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { allPaths: [], addPath: (_: number, _2: [number, number][]) => {} }
}

onMounted(() => {
  console.log('Component is mounted')
  storeReady = true
})

function range(start: number, end: number): number[] {
  const ans = []
  for (let i = start; i < end; i++) {
    ans.push(i)
  }
  return ans
}

const numbers = range(0, props.squares * 2 - 1)

const hasPiece = function (x: number, y: number): boolean {
  const findIndex = props.pieces.findIndex((p) => p[1] === x && p[2] === y)
  return findIndex !== -1
}

const getPieceData = function (x: number, y: number): PieceData | null {
  const findIndex = props.pieces.findIndex((p) => p[1] === x && p[2] === y)
  if (findIndex !== -1) {
    return props.pieces[findIndex][0]
  }
  return null
}

const pieceBeingPlanned = ref(-1),
  pieceSelected = ref(-1)

// eslint-disable-next-line prefer-const
let pathBeingPlanned: [number, number][] = reactive([])

const pairwise = function pairwise(
  arr: [number, number][],
  func: (first: [number, number], second: [number, number]) => boolean,
): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (func(arr[i], arr[i + 1])) return true
  }
  return false
}

const routeInPath = function (x: number, y: number, path: [number, number][]): boolean {
  if (isPieceSquare(x, y)) {
    return path.some((p) => p[0] === x && p[1] === y)
  }

  return pairwise(path, (first: [number, number], second: [number, number]) => {
    return (first[0] + second[0]) / 2 === x && (first[1] + second[1]) / 2 === y
  })
}

const routeBeingUsed = function (x: number, y: number): boolean {
  return routeInPath(x, y, pathBeingPlanned)
}

const routeInFinishedPaths = function (x: number, y: number): boolean {
  return getStore().allPaths.some((e) => routeInPath(x, y, e[1]))
}

const mouseOver = function (x: number, y: number): void {
  if (shouldCapturePath) {
    if (isNothingSquare(x, y)) {
      cancelPath()
    }
    if (pathBeingPlanned.length === 0 && pieceBeingPlanned.value !== -1) {
      pathBeingPlanned.push([x, y])
    } else if (pathBeingPlanned.length > 0) {
      const [firstX, firstY] = pathBeingPlanned[0]
      if (
        (Math.abs(firstX - x) == 0 && Math.abs(firstY - y) == 2) ||
        (Math.abs(firstX - x) == 2 && Math.abs(firstY - y) == 0)
      ) {
        // valid path
        pathBeingPlanned.unshift([x, y])
      }
    }
  }
}

const acceptPath = function (): void {
  getStore().addPath(pieceBeingPlanned.value, pathBeingPlanned)
  cancelPath()
}

const cancelPath = function (): void {
  pieceBeingPlanned.value = -1
  pathBeingPlanned.splice(0)
}

const getPieceLocation = function (id: number): [x: number, y: number] {
  const pieceAndLocation = props.pieces.find((p) => p[0].id === id)
  if (pieceAndLocation) {
    return [pieceAndLocation[1], pieceAndLocation[2]]
  }
  throw new Error('Cannot get location of piece ' + id)
}

const isHorizontalRoute = function (x: number, y: number): boolean {
  return y % 2 == 0 && x % 2 == 1
}

const isVerticalRoute = function (x: number, y: number): boolean {
  return y % 2 == 1 && x % 2 == 0
}

const isPieceSquare = function (x: number, y: number): boolean {
  return x % 2 == 0 && y % 2 == 0
}

const isSelected = function (x: number, y: number): boolean {
  if (pieceSelected.value !== -1) {
    const loc = getPieceLocation(pieceSelected.value)
    return x === loc[0] && y === loc[1]
  }
  return false
}

const isNothingSquare = function (x: number, y: number): boolean {
  return y % 2 == 1 && x % 2 == 1
}

let shouldCapturePath = false
const select = function (x: number, y: number): void {
  if (pathBeingPlanned && pathBeingPlanned.length > 1) {
    acceptPath()
  }

  const pd = getPieceData(x, y)
  if (pd) {
    if (pd.isHuman) {
      shouldCapturePath = true
      pieceBeingPlanned.value = pd.id
      pathBeingPlanned.splice(0)
      pathBeingPlanned.push([x, y])
    }
    pieceSelected.value = pd.id
    emit('pieceSelected', pd.id)
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div>
        <button type="button" class="btn btn-success" @click="acceptPath">Set Path</button>
        &nbsp;
        <button type="button" class="btn btn-danger" @click="cancelPath">Cancel</button>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="d-flex justify-content-center">
        <table>
          <tr v-for="yCoord in numbers" :key="yCoord">
            <td
              v-for="xCoord in numbers"
              :key="xCoord + ' ' + yCoord"
              @click="select(xCoord, yCoord)"
              style="height: 30px; width: 30px"
              v-bind:class="{
                piece: isPieceSquare(xCoord, yCoord),
                selected: isSelected(xCoord, yCoord),
                selectedPiece: routeBeingUsed(xCoord, yCoord),
                selectedB4Piece: routeInFinishedPaths(xCoord, yCoord),
              }"
              @mouseover="mouseOver(xCoord, yCoord)"
            >
              <div v-if="isHorizontalRoute(xCoord, yCoord) || isVerticalRoute(xCoord, yCoord)">
                <hr
                  :class="{
                    path: true,
                    xPath: isHorizontalRoute(xCoord, yCoord),
                    yPath: isVerticalRoute(xCoord, yCoord),
                    selectedPath: routeBeingUsed(xCoord, yCoord),
                    selectedB4Path: routeInFinishedPaths(xCoord, yCoord),
                  }"
                />
              </div>
              <div v-else>
                <transition name="pieceMove">
                  <GamePiece
                    v-if="hasPiece(xCoord, yCoord)"
                    :piece-data="getPieceData(xCoord, yCoord)!"
                    @click="select(xCoord, yCoord)"
                  />
                </transition>
                <div v-if="!hasPiece(xCoord, yCoord)"></div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pieceMove-enter-active,
.pieceMove-leave-active {
  transition: opacity 1s ease;
}

.pieceMove-enter-from,
.pieceMove-leave-to {
  opacity: 0;
}

.selectedPath.path {
  border-color: lime;
  animation: blink 1s infinite;
}

.selectedB4Path.path {
  border-color: lightgreen;
  animation: blink 1s infinite;
}

.path {
  width: 28px;
  border-style: solid;
  border-color: white;
}

.xPath.path {
  vertical-align: middle;
}

.yPath.path {
  transform: rotate(90deg);
}

.selectedPiece.piece {
  border-color: lime;
  animation: blink 0.5s infinite;
}

.selectedB4Piece.piece {
  border-color: lightgreen;
  animation: blink 0.5s infinite;
}

.selected.piece {
  border-color: lime;
  border-style: solid;
  animation: blink 1s;
  animation-iteration-count: 3;
}

.piece {
  border: 2px;
  border-color: black;
  border-style: solid;
}

@keyframes blink {
  50% {
    border-color: white;
  }
}
</style>
