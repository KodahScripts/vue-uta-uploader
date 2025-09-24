<template>
  <p class="title">UTA Uploader</p>
  <div class="container">
    <div class="left-col">
      <div class="btn-group">
        <UploadButton
          v-for="button in uploadButtons"
          :key="`upload-${button.id}-btn`"
          :id="button.id"
          @fileData="button.handler"
          @clearData="button.clearHandler"
          :class="button.disabled ? 'disabled' : ''"
        />
      </div>
    </div>
    <div v-if="hasDataUTA" class="uta-data">
      <div class="content">
        <div class="row">
          <div v-for="COLHEAD in UPLOADHEADER" :key="`col-${COLHEAD}`">{{ COLHEAD }}</div>
        </div>
        <div v-for="(row, index) in uploadRows" :key="`uta-row-${index}`" class="row">
          <div v-for="(col, index) in row" :key="`col-${index}`">{{ col }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { UPLOADHEADER } from './utils/uta.constants'

import { useUTAStore } from './stores/datauta'
import { use225Store } from './stores/data225'
import { use12Store } from './stores/data12'

import UploadButton from './components/UploadButton.vue'

const utaStore = useUTAStore()
const { loadUTA, clearUTA } = utaStore
const { hasDataUTA, uploadRows } = storeToRefs(utaStore)

const store225 = use225Store()
const { load225, clear225 } = store225
// const {  } = storeToRefs(store225)

const store12 = use12Store()
const { load12, clear12 } = store12
// const { getValidRows } = storeToRefs(utaStore)

const uploadButtons = [
  { id: '225', handler: handle225, clearHandler: clear225, disabled: false },
  { id: '12', handler: handle12, clearHandler: clear12, disabled: true },
  { id: 'UTA', handler: handleUTA, clearHandler: clearUTA, disabled: true },
]

function handleUTA(data: Array<string>) {
  loadUTA(data)
}

function handle225(data: Array<string>) {
  uploadButtons
    .filter((button) => button.id === '12')
    .forEach((button) => (button.disabled = false))
  load225(data)
}

function handle12(data: Array<string>) {
  uploadButtons
    .filter((button) => button.id === 'UTA')
    .forEach((button) => (button.disabled = false))
  load12(data)
}
</script>

<style scoped>
.title {
  font-size: clamp(2rem, 2.5vw, 4rem);
}

.container {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
}

.left-col {
  width: 15rem;
  margin: 0 2.5rem;
}

.content {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.btn-group > * {
  margin-bottom: 0.5rem;
}
.row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.disabled {
  display: none;
}
</style>
