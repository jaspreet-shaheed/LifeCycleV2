import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { defineStore } from 'pinia'

export const usePathStore = defineStore('paths', {
  state: (): StoreState => ({
    paths: [],
  }),
  getters: {
    allPaths: (state) => state.paths,
    getNextMoves: (state) => state.paths.map((p) => p[1][0]),
  },
  actions: {
    addPath(pieceId: number, itsPath: [number, number][]) {
      const el = this.paths.find((ep) => ep[0] === pieceId)!
      if (el) {
        el[1] = [...itsPath]
      } else {
        const newEl: [number, [number, number][]] = [pieceId, [...itsPath]]
        this.paths.push(newEl)
      }
    },
    makeMove(pieceId: number) {
      const el = this.paths.find((ep) => ep[0] === pieceId)!
      if (el[1].length === 1) {
        this.paths.splice(
          this.paths.findIndex((p) => p[0] === pieceId),
          1,
        )
      } else {
        el[1].shift()
      }
    },
  },
})

interface StoreState {
  paths: [number, [number, number][]][]
}

createApp(App).mount('#app')
