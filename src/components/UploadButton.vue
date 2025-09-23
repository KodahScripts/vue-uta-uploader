<template>
  <div v-if="!hasData">
    <input :id="id" type="file" accept=".xlsx, .xls" @change="handleUpload" />
    <label :for="id" class="missing-data">Upload {{ id }}</label>
  </div>
  <div v-else>
    <label :for="id" @click="handleClear" class="data-loaded">Clear {{ id }}</label>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { read, utils } from 'xlsx'

defineProps<{
  id: string
}>()

const hasData = ref(false)

const emit = defineEmits(['fileData', 'clearData'])

const handleUpload = (event: Event) => {
  const file = event.target?.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const workbook = read(e.target?.result)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 })
    emit('fileData', jsonData)
    hasData.value = true
  }
  reader.readAsArrayBuffer(file)
}

const handleClear = () => {
  emit('clearData')
  hasData.value = false
}
</script>
<style scoped>
input {
  display: none;
}
label {
  display: block;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  padding: 1rem 2rem;
  cursor: pointer;
}
.missing-data {
  border: 1px solid grey;
  border-radius: 4rem;
  background-color: lightgray;
}
.data-loaded {
  border: 1px solid green;
  border-radius: 4rem;
  background-color: lightgreen;
}
</style>
