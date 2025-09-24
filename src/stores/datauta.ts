import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { use225Store } from './data225'

import { ACCOUNTS, getMerchantType } from '@/utils/bmw.constants'
import { COLUMN } from '@/utils/uta.constants'
import { convertDate, cleanString } from '@/utils/excel.functions'

export const useUTAStore = defineStore('datauta', () => {
  const dataUTA: Ref<Array<string> | null> = ref(null)
  const uploadRows: Ref<Array<string | number | ACCOUNTS>[]> = ref([])
  const { getControlValue } = use225Store()

  const loadUTA = (data: Array<string>) => {
    dataUTA.value = data
  }

  const hasDataUTA = computed(() => {
    return dataUTA.value === null ? false : true
  })

  const cleanRowsUTA = computed(() => {
    return dataUTA.value?.filter((row) => row[COLUMN.RESPONSE] != 'DENIED')
  })

  const getValidRowsUTA = computed(() => {
    cleanRowsUTA.value?.map((row, index) => {
      const arr: Array<Array<string | number>> = []
      if (index > 0) {
        const date = convertDate(Number(row[COLUMN.DATE]))
        const merch = getMerchantType(String(row[COLUMN.MERCHANT]))
        const utaAmt = Number(row[COLUMN.TOTAL_AMOUNT])
        const chk = Number(row[COLUMN.CHECK_NUMBER])
        const ref = `UTA${date}${merch.code}`
        const ctrl = cleanString(row[COLUMN.CONTROL])
        const allCtrls = ctrl.split(' ')

        if (allCtrls.length > 0) {
          allCtrls.forEach((cont) => {
            const c = Number(cont)
            if (merch.code === 'F') {
              const val = getControlValue(c)
              arr.push([ref, ref, merch.acct, Number(val), c, `CHK#${chk}`])
            } else {
              arr.push([ref, ref, merch.acct, Number(utaAmt), c, `CHK#${chk}`])
            }
          })
        }
        arr.push([ref, ref, merch.acct, Number(utaAmt), ctrl, `CHK#${chk}`])
      }
      return arr
    })
  })

  const clearUTA = () => {
    dataUTA.value = null
  }

  return { loadUTA, uploadRows, hasDataUTA, getValidRowsUTA, clearUTA }
})
