<template>
  <p class="title">UTA Uploader</p>
  <div class="container">
    <div class="left-col">
      <div class="btn-group">
        <UploadButton
          v-for="key in Object.keys(uploadButtons)"
          :key="`upload-${key}-btn`"
          :id="key"
          @fileData="uploadButtons[key].handler"
          @clearData="uploadButtons[key].clearHandler"
          :class="{ disabled: uploadButtons[key].disabled }"
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
import { useCashSalesDataStore } from './stores/cashSalesData'
import { useCustomerDepositDataStore } from './stores/customerDepositData'

import UploadButton from './components/UploadButton.vue'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

const utaStore = useUTAStore()
const { loadUTA, clearUTA } = utaStore
const { hasDataUTA, uploadRows, getValidRowsUTA } = storeToRefs(utaStore)

const cashSalesStore = useCashSalesDataStore()
const { loadCashSalesData, hasCashSalesData, clearCashSalesData } = cashSalesStore
// const {  } = storeToRefs(store225)

const customerDepositDataStore = useCustomerDepositDataStore()
const { loadCustomerDepositData, hasCustomerDepositData, clearCustomerDepositData } =
  customerDepositDataStore
// const { getValidRows } = storeToRefs(utaStore)

interface UploadButton {
  [name: string]: {
    handler: (data: Array<string>) => void
    clearHandler: () => void
    disabled: boolean
  }
}

const uploadButtons: Ref<UploadButton> = ref({
  'cash-sales': {
    handler: handleCashSalesData,
    clearHandler: clearCashSalesData,
    disabled: false,
  },
  'customer-deposits': {
    handler: handleCustomerDepositData,
    clearHandler: clearCustomerDepositData,
    disabled: true,
  },
  'uta-report': {
    handler: handleUTA,
    clearHandler: clearUTA,
    disabled: true,
  },
})

const updateCustomerDepositButton = computed(() => {})

function handleUTA(data: Array<string>) {
  loadUTA(data)
}

function handleCashSalesData(data: Array<string>) {
  loadCashSalesData(data)
}

function handleCustomerDepositData(data: Array<string>) {
  loadCustomerDepositData(data)
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
