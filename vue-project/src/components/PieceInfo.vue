<script setup lang="ts">
import PieceData from './PieceData'

const props = defineProps<{
  selectedPiece: PieceData | null
}>()
</script>

<template>
  <div style="height: 4rem"></div>
  <div v-if="props.selectedPiece">
    <table>
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
          <td>{{ props.selectedPiece.readyToMovePercent }}%</td>
        </tr>
        <tr>
          <td>Strength</td>
          <td>{{ props.selectedPiece.lifeStrength }}</td>
        </tr>
        <tr>
          <td>Damage</td>
          <td>{{ props.selectedPiece.damage }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
