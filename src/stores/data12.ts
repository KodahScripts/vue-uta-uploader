import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const use12Store = defineStore('data12', () => {
  const data12: Ref<Array<string> | null> = ref(null)

  const load12 = (data: Array<string>) => {
    data12.value = data
  }

  const clear12 = () => {
    data12.value = null
  }

  return { load12, clear12 }
})
