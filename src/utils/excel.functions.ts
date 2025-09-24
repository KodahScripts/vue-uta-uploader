export function convertDate(excelDateValue: number) {
  const newDate = new Date(Math.round((excelDateValue - 25569) * 86400 * 1000))
  const month = newDate.getMonth() + 1 > 9 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`
  const day = newDate.getDate()
  const year = newDate.getFullYear().toString().slice(-2)
  return `${month}${day}${year}`
}

export const cleanString = (str: string) => {
  if (str.includes('/')) {
    str = str.replace(/\//g, ' ')
  }
  return str
}
