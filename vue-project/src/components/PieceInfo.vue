<script setup lang="ts">
import PieceData from './PieceData'
import { computed } from 'vue'

const props = defineProps<{
  selectedPiece: PieceData | null
}>()

const moveText = computed(() => (props.selectedPiece?.readyToMovePercent ?? 100) + '%')
const movePercent = computed(() => 'width: ' + moveText.value)

const lifeText = computed(() => (props.selectedPiece?.lifeStrength ?? 100) + '%')
const lifeStrength = computed(() => 'width: ' + lifeText.value)

const damageText = computed(() => (props.selectedPiece?.damage ?? 0) + '%')
const damagePercent = computed(() => 'width: ' + damageText.value)
</script>

<template>
  <div style="height: 4.5rem"></div>
  <div class="justify-content-center">
    <div v-if="props.selectedPiece">
      <table class="table table-striped table-dark">
        <tbody>
          <tr>
            <td>PieceId</td>
            <td>{{ props.selectedPiece.id }}</td>
          </tr>
          <tr>
            <td>IsHuman?</td>
            <td>{{ props.selectedPiece.isHuman ? 'Yes' : 'No' }}</td>
          </tr>
          <tr>
            <td>Move Ready</td>
            <td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:style="movePercent">
                  {{ moveText }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Strength</td>
            <td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:style="lifeStrength">
                  {{ lifeText }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Damage</td>
            <td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:style="damagePercent">
                  {{ damageText }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
