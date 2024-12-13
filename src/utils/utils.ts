type TitleVariants = 'день' | 'дней' | 'дня' | 'час' | 'часа' | 'часов' | ''

const getDurationTitle = (number: number, isHour?: boolean): TitleVariants => {
  const isMultiCase = number > 10 && [11, 12, 13, 14].includes(number % 100)
  if (isMultiCase) return 'дней'
  const lastNumber = number % 10
  if (lastNumber == 1) return isHour ? 'час' : 'день'
  if ([2, 3, 4].includes(lastNumber)) return isHour ? 'часа' : 'дня'
  if ([5, 6, 7, 8, 9, 0].includes(lastNumber)) return isHour ? 'часов' : 'дней'
  return ''
}

const countDuration = (
  dateString: string,
  executionDateString: string
): string => {
  const diffInMilliseconds =
    new Date(executionDateString).getTime() - new Date(dateString).getTime()
  if (diffInMilliseconds > 0) {
    const diffInDays = Math.floor(diffInMilliseconds / (24 * 3600 * 1000))
    if (diffInDays < 1) {
      const diffInHours = diffInMilliseconds / 60000 / 60
      return `(${diffInHours} ${getDurationTitle(diffInHours, true)})`
    }
    return `${diffInDays} ${getDurationTitle(diffInDays)}`
  } else {
    return ''
  }
}

export const formatDate = (
  dateString: string,
  executionDateString?: string
): string => {
  let formattedDate: string = ''
  const date = new Date(dateString)
  const isValidDate = !isNaN(date.getTime())
  if (isValidDate) {
    formattedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    if (executionDateString) {
      formattedDate = `${formattedDate} ${countDuration(
        dateString,
        executionDateString
      )}`
    }
  }
  return formattedDate
}

export const formatNumberWithSpaces = (number: number): string => {
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
