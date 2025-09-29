export interface ACCOUNTS {
  FIXED: number
  HOLD: number
  VARIABLE: number
}

interface STORE {
  [name: string]: ACCOUNTS
}

const STORE: STORE = {
  BMW: {
    FIXED: 3225,
    VARIABLE: 3304,
    HOLD: 3304,
  },
  WCN: {
    FIXED: 3225,
    VARIABLE: 3304,
    HOLD: 3304,
  },
}

export const MERCHANTS = {
  VARIABLE: {
    CODE: 'V',
    NUMBER: '00',
  },
  FIXED: {
    CODE: 'F',
    NUMBER: '02',
  },
  HOLD: {
    CODE: 'H',
    NUMBER: '01',
  },
}

export enum COLUMN {
  DATE = 1,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  MERCHANT = 7,
  RESPONSE = 15,
  CONTROL = 21,
}

export const UPLOADHEADER = [
  'Reference #',
  'Receipt #',
  'G/L Account',
  'Amount',
  'Control #',
  'Description',
]

export function getMerchantType(merchantNumber: string, store: string) {
  const merchantCode = merchantNumber.slice(-2)
  if (merchantCode === MERCHANTS.VARIABLE.NUMBER) {
    return { code: MERCHANTS.VARIABLE.CODE, acct: STORE[store].VARIABLE }
  }
  if (merchantCode === MERCHANTS.FIXED.NUMBER) {
    return { code: MERCHANTS.FIXED.CODE, acct: STORE[store].FIXED }
  }
  return { code: MERCHANTS.HOLD.CODE, acct: STORE[store].HOLD }
}
