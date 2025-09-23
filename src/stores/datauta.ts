import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { use225Store } from './data225'

enum COLUMN {
  RESPONSE = 15,
  DATE = 1,
  MERCHANT = 7,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  CONTROL = 21,
}

enum ACCOUNTS {
  FIXED = 3225,
  VARIABLE = 3304,
  HOLD = 1000,
}

function convertDate(excelDateValue: number) {
  const newDate = new Date(Math.round((excelDateValue - 25569) * 86400 * 1000))
  const month = newDate.getMonth() + 1 > 9 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`
  const day = newDate.getDate()
  const year = newDate.getFullYear().toString().slice(-2)
  return `${month}${day}${year}`
}

function getMerchantType(merchantNumber: string) {
  const merchantCode = merchantNumber.slice(-2)
  let obj = { code: 'H', acct: ACCOUNTS.HOLD }
  if (merchantCode === '00') {
    obj = { code: 'V', acct: ACCOUNTS.VARIABLE }
  }
  if (merchantCode === '02') {
    obj = { code: 'F', acct: ACCOUNTS.FIXED }
  }
  return obj
}

export const useUTAStore = defineStore('datauta', () => {
  const dataUTA: Ref<Array<string> | null> = ref(null)
  const uploadRows: Ref<Array<string | number | ACCOUNTS>[]> = ref([])
  const { getControlValue } = use225Store()
  const UPLOADHEADER = ref([
    'Reference #',
    'Receipt #',
    'G/L Account',
    'Amount',
    'Control #',
    'Description',
  ])

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
    cleanRowsUTA.value?.forEach((row, index) => {
      if (index > 0) {
        const date = convertDate(Number(row[COLUMN.DATE]))
        const merch = getMerchantType(String(row[COLUMN.MERCHANT]))
        const utaAmt = Number(row[COLUMN.TOTAL_AMOUNT])
        const chk = Number(row[COLUMN.CHECK_NUMBER])
        const ref = `UTA${date}${merch.code}`
        let ctrl = String(row[COLUMN.CONTROL]).trim()
        ctrl = ctrl.replace('/', ' ')
        const allCtrls = ctrl.split(' ')
        allCtrls.forEach((cont) => {
          if (merch.code === 'F') {
            const val = getControlValue(Number(cont))
            uploadRows.value.push([ref, ref, merch.acct, Number(val), cont, `CHK#${chk}`])
          } else {
            uploadRows.value.push([ref, ref, merch.acct, Number(utaAmt), cont, `CHK#${chk}`])
          }
        })
      }
    })
  })

  const clearUTA = () => {
    dataUTA.value = null
  }

  return { loadUTA, UPLOADHEADER, uploadRows, hasDataUTA, getValidRowsUTA, clearUTA }
})
