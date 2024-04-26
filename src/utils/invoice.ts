import { InvoiceItemResponseDto } from 'src/__generated__/AccountifyAPI'

export const calculateInvoiceItemTotal = (price: number, quantity: number): number => {
  return price * quantity
}

export const calculateInvoiceSubtotal = (items: InvoiceItemResponseDto[]): number => {
  return items?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity
  }, 0)
}
