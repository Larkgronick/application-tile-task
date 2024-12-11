export const formatNumberWithSpaces = (number: number) => {
  const numberStr = number.toString()
  let formattedNumber = ''
  let count = 0
  for (let i = numberStr.length - 1; i >= 0; i--) {
    formattedNumber = numberStr[i] + formattedNumber
    count++
    if (count % 3 === 0 && i !== 0) {
      formattedNumber = ' ' + formattedNumber
    }
  }
  return formattedNumber
}

export const setStatusColor = (status: string) => {
  switch (status) {
    case 'В работе':
      return '#5D5D5D'
    case 'Просрочена':
      return '#F9372C'
    case 'Есть отзыв':
      return '#019EC1'
    case 'Выполнена':
      return '#1C9A13'
    default:
      return '#ffffff'
  }
}
