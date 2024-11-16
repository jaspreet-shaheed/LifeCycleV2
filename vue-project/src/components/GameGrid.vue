<script setup lang="ts">
import * as _ from 'lodash'
import GamePiece from './GamePiece.vue'
import PieceData from './PieceData.js'
import { onMounted, reactive, ref } from 'vue'

const props = defineProps<{
  squares: number
  pieces: [PieceData, number, number][]
}>()

import { pathStore } from './../main'

// access the `store` variable anywhere in the component ✨

let storeReady: boolean = false
function getStore() {
  return storeReady ? pathStore() : { allPaths: [] }
}

onMounted(() => {
  console.log('Component is mounted')
  storeReady = true
})

const numbers = _.range(0, props.squares * 2 - 1, 1)

const hasPiece = function (x: number, y: number): boolean {
  const findIndex = props.pieces.findIndex((p) => p[1] === x && p[2] === y)
  return findIndex !== -1
}

const getPieceData = function (x: number, y: number): PieceData {
  const findIndex = props.pieces.findIndex((p) => p[1] === x && p[2] === y)
  if (findIndex !== -1) {
    return props.pieces[findIndex][0]
  }
  throw new Error('No piece here')
}

const selectedX = ref(-1),
  selectedY = ref(-1),
  pieceBeingPlanned = ref(-1)

// eslint-disable-next-line prefer-const
let pathBeingPlanned: [number, number][] = reactive([])

const routeBeingUsed = function (x: number, y: number): boolean {
  return (
    pathBeingPlanned.findIndex((e: [number, number]) => {
      return e[0] === x && e[1] === y
    }) !== -1
  )
}

const routeInFinishedPaths = function (x: number, y: number): boolean {
  return getStore().allPaths.some(
    (e) =>
      e[1].findIndex((p: [number, number]) => {
        return p[0] === x && p[1] === y
      }) !== -1,
  )
}

const dragBegin = function (event: DragEvent, pieceId: number): void {
  pieceBeingPlanned.value = pieceId
  pathBeingPlanned.splice(0)
}

const dragOver = function (x: number, y: number): void {
  if (pathBeingPlanned.length === 0 && !isNothingSquare(x, y) && selectedX.value !== -1) {
    pathBeingPlanned.push([x, y])
  } else {
    const [firstX, firstY] = pathBeingPlanned[0]
    if (!(firstX === x && firstY === y)) {
      if (
        (!isNothingSquare(x, y) && Math.abs(firstX - x) == 0 && Math.abs(firstY - y) == 1) ||
        (Math.abs(firstX - x) == 1 && Math.abs(firstY - y) == 0)
      ) {
        // valid path
        pathBeingPlanned.unshift([x, y])
      } else {
        cancelPath()
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
  selectedX.value = -1
  selectedY.value = -1
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
  return x === selectedX.value && y === selectedY.value
}

const isNothingSquare = function (x: number, y: number): boolean {
  return y % 2 == 1 && x % 2 == 1
}

const identifyPathClass = function (x: number, y: number): string {
  if (routeBeingUsed(x, y)) {
    if (isHorizontalRoute(x, y)) {
      return 'selectedXPath'
    } else if (isVerticalRoute(x, y)) {
      return 'selectedYPath'
    }
  } else if (routeInFinishedPaths(x, y)) {
    if (isHorizontalRoute(x, y)) {
      return 'selectedB4XPath'
    } else if (isVerticalRoute(x, y)) {
      return 'selectedB4YPath'
    }
  } else {
    if (isHorizontalRoute(x, y)) {
      return 'xPath'
    } else if (isVerticalRoute(x, y)) {
      return 'yPath'
    }
  }
  return ''
}

const identifyPieceClass = function (x: number, y: number): string {
  if (isSelected(x, y)) {
    return 'selectedPiece'
  }

  if (routeBeingUsed(x, y)) {
    return 'selectedPiecePath'
  } else if (routeInFinishedPaths(x, y)) {
    return 'selectedB4PiecePath'
  } else {
    return 'piece'
  }
}

const select = function (x: number, y: number): void {
  selectedX.value = x
  selectedY.value = y
}
</script>

<template>
  <div>
    <div>
      <button type="button" class="btn btn-success text-center" @click="acceptPath">
        Set Path
      </button>
      &nbsp;
      <button type="button" class="btn btn-danger text-center" @click="cancelPath">Cancel</button>
      <hr />
    </div>
    <table>
      <tr v-for="yCoord in numbers" :key="yCoord">
        <td
          v-for="xCoord in numbers"
          :key="xCoord + ' ' + yCoord"
          style="height: 30px; width: 30px"
          @dragover="dragOver(xCoord, yCoord)"
          v-bind:class="isPieceSquare(xCoord, yCoord) ? identifyPieceClass(xCoord, yCoord) : ''"
        >
          <div v-if="isHorizontalRoute(xCoord, yCoord) || isVerticalRoute(xCoord, yCoord)">
            <hr
              :class="identifyPathClass(xCoord, yCoord)"
              v-if="isHorizontalRoute(xCoord, yCoord)"
            />
            <hr :class="identifyPathClass(xCoord, yCoord)" v-if="isVerticalRoute(xCoord, yCoord)" />
          </div>

          <div v-if="isPieceSquare(xCoord, yCoord)">
            <GamePiece
              v-if="hasPiece(xCoord, yCoord)"
              :piece-data="getPieceData(xCoord, yCoord)"
              @click="select(xCoord, yCoord)"
              @drag-begin="dragBegin"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.selectedXPath {
  vertical-align: middle;
  border-color: lime;
}

.selectedYPath {
  transform: rotate(90deg);
  border-color: lime;
}

.selectedB4XPath {
  vertical-align: middle;
  border-style: dashed;
  border-color: blue;
}

.selectedB4YPath {
  transform: rotate(90deg);
  border-style: dashed;
  border-color: blue;
}

.selectedPiecePath {
  border: 2px;
  border-style: solid;
  border-color: lime;
}

.selectedB4PiecePath {
  border: 2px;
  border-style: solid;
  border-color: blue;
}

.xPath {
  vertical-align: middle;
  width: 30px;
  border-style: dashed;
  border-color: white;
}

.yPath {
  transform: rotate(90deg);
  width: 30px;
  border-style: dashed;
  border-color: white;
}

.selectedPiece {
  border: 2px;
  border-style: solid;
  border-color: lime;
}

.piece {
  border: 2px;
  border-style: dashed;
  border-color: white;
}
</style>
