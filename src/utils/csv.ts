import { format } from 'date-fns'

export const generateCsvFilename = (type: string) => {
  const currentDate = new Date()

  return `${type}_${format(currentDate, 'yyyy-MM-dd')}`
}
