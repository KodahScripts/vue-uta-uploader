export enum ACCOUNTS {
  FIXED = 3225,
  VARIABLE = 3304,
  HOLD = 1000,
}

export function getMerchantType(merchantNumber: string) {
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
