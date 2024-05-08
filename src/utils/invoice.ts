import { InvoiceItemResponseDto } from 'src/__generated__/AccountifyAPI'
import { CreateInvoiceFormData } from 'src/pages/[organization]/invoice/add'
import { UpdateInvoiceFormData } from 'src/views/apps/invoice/edit/Edit'

export const calculateInvoiceItemTotal = (price: number, quantity: number): number => {
  return price * quantity
}

export const calculateInvoiceSubtotal = (
  items: InvoiceItemResponseDto[] | CreateInvoiceFormData[] | UpdateInvoiceFormData[]
): number => {
  // We have to use any[] here since Union type with .reduce() makes `yarn build` error
  return (items as any[])?.reduce((accumulator, currentValue) => {
    if (currentValue.price && currentValue.quantity) {
      return accumulator + currentValue.price * currentValue.quantity
    } else {
      return accumulator
    }
  }, 0)
}

export const calculateInvoiceTotal = (
  items: InvoiceItemResponseDto[] | CreateInvoiceFormData[] | UpdateInvoiceFormData[],
  tax: string
): number => {
  // We have to use any[] here since Union type with .reduce() makes `yarn build` error
  let total = (items as any[]).reduce((accumulator, currentValue) => {
    if (currentValue.price && currentValue.quantity) {
      return accumulator + currentValue.price * currentValue.quantity
    } else {
      return accumulator
    }
  }, 0)
  const invoiceTax = tax ? parseInt(tax) / 100 : 0 // tax can be null

  total += total * invoiceTax

  return total
}
