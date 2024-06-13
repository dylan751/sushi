import { getOrgUniqueName } from '../organization'

export const getInvoiceListUrl = (): string => {
  return `/${getOrgUniqueName()}/invoice/list`
}

export const getInvoiceAddUrl = (): string => {
  return `/${getOrgUniqueName()}/invoice/add`
}

export const getInvoiceEditUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/invoice/edit/${id}`
}

export const getInvoicePreviewUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/invoice/preview/${id}`
}

export const getInvoicePrintUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/invoice/print/${id}`
}
