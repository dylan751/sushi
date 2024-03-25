import { CurrencyType } from 'src/__generated__/AccountifyAPI'

export const calculateInvoiceItemTotal = (price: number, quantity: number): number => {
  return price * quantity
}

export const formatInvoiceCurrency = (total: number, currency: CurrencyType): string => {
  switch (currency) {
    case CurrencyType.VND: {
      return `${total} VND`
    }
    case CurrencyType.USD: {
      return `$${total}`
    }
    default:
      return `${total} VND`
  }
}
