<template>
  <p class="title">UTA Uploader</p>
  <div class="container">
    <div class="left-col">
      <div class="btn-group">
        <UploadButton id="225" @fileData="handle225" @clearData="clear225" />
        <UploadButton id="12" @fileData="handle12" @clearData="clear12" />
        <UploadButton id="UTA" @fileData="handleUTA" @clearData="clearUTA" />
      </div>
    </div>
    <div class="content">
      <div v-if="hasDataUTA" class="uta-data">
        {{ UPLOADHEADER }}
        <div v-for="(row, index) in uploadRows" :key="`uta-row-${index}`">{{ row }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useUTAStore } from './stores/datauta'
import { use225Store } from './stores/data225'
import { use12Store } from './stores/data12'

import UploadButton from './components/UploadButton.vue'

const utaStore = useUTAStore()
const { loadUTA, clearUTA } = utaStore
const { UPLOADHEADER, hasDataUTA, uploadRows } = storeToRefs(utaStore)

const store225 = use225Store()
const { load225, clear225 } = store225
// const {  } = storeToRefs(store225)

const store12 = use12Store()
const { load12, clear12 } = store12
// const { getValidRows } = storeToRefs(utaStore)

function handleUTA(data: Array<string>) {
  loadUTA(data)
}

function handle225(data: Array<string>) {
  load225(data)
}

function handle12(data: Array<string>) {
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
</style>
