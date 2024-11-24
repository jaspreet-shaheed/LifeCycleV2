<script setup lang="ts">
import PieceData from './PieceData'
import { computed } from 'vue'

const props = defineProps<{
  selectedPiece: PieceData | null
}>()

const movePercent = computed(
  () => 'width: ' + (props.selectedPiece?.readyToMovePercent ?? 100) + '%',
)

const lifeStrength = computed(() => 'width: ' + (props.selectedPiece?.lifeStrength ?? 100) + '%')

const damagePercent = computed(() => 'width: ' + (props.selectedPiece?.damage ?? 0) + '%')
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
                <div class="progress-bar" role="progressbar" v-bind:style="movePercent"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Strength</td>
            <td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:style="lifeStrength"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Damage</td>
            <td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:style="damagePercent"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
