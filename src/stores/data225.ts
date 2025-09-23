import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const use225Store = defineStore('data225', () => {
  const data225: Ref<Array<string> | null> = ref(null)

  const load225 = (data: Array<string>) => {
    data225.value = data
  }

  function getControlValue(controlNumber: number) {
    if (data225.value) {
      return data225.value.filter((row) => Number(row[0]) === controlNumber).length > 0
        ? data225.value.filter((row) => Number(row[0]) === controlNumber)[0][1]
        : false
    }
    return false
  }

  const clear225 = () => {
    data225.value = null
  }

  return { load225, getControlValue, clear225 }
})
