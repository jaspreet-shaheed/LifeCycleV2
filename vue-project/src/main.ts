import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { defineStore } from 'pinia'
import { createPinia } from 'pinia'

interface StoreState {
  paths: [number, [number, number][]][]
  directions: [number, direction][]
}

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

export enum direction {
  up = 0,
  right = 1,
  down = 2,
  left = 3,
}

export const pathStore = defineStore('paths', {
  state: (): StoreState => ({
    paths: [],
    directions: [],
  }),
  getters: {
    allPaths: (state) => state.paths,
    getNextMoves: (state) => {
      const res: [number, [number, number]][] = state.paths.map((p) => [p[0], p[1][1]])
      return res
    },
    getDirections: (state) => state.directions,
  },
  actions: {
    addPath(pieceId: number, itsPath: [number, number][]) {
      const reversedPath = itsPath.reverse()
      reversedPath.shift()

      if (reversedPath.length % 2 === 0) {
        console.log(
          'Adding path ',
          reversedPath.map((c) => '(' + c[0] + ',' + c[1] + ')'),
        )

        const el = this.paths.find((ep) => ep[0] === pieceId)
        if (el) {
          el[1] = [...reversedPath]
        } else {
          const newEl: [number, [number, number][]] = [pieceId, [...reversedPath]]
          this.paths.push(newEl)
        }
      }
    },
    makeMove(pieceId: number) {
      const el = this.paths.find((ep) => ep[0] === pieceId)!
      if (el[1].length === 2) {
        this.paths.splice(
          this.paths.findIndex((p) => p[0] === pieceId),
          1,
        )
      } else {
        el[1].shift()
        el[1].shift()
      }
    },
    updateDirection(pieceId: number, dir: direction) {
      const pd = this.directions.find((ep) => ep[0] === pieceId)
      if (pd) {
        pd[1] = dir
      } else {
        this.directions.push([pieceId, dir])
      }
    },
  },
})
