import { getOrgUniqueName } from '../organization'

export const getProjectDefaultTab = (id: number): string => {
  return `/${getOrgUniqueName()}/projects/${id}/dashboard`
}

export const getProjectInvoiceTab = (id: number): string => {
  return `/${getOrgUniqueName()}/projects/${id}/invoice`
}

export const getProjectListUrl = (): string => {
  return `/${getOrgUniqueName()}/projects/list`
}

export const getProjectAddUrl = (): string => {
  return `/${getOrgUniqueName()}/projects/add`
}

export const getProjectEditUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/projects/edit/${id}`
}
