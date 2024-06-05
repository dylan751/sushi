import { getOrgUniqueName } from '../organization'

export const getProjectDefaultTab = (projectName: string | undefined): string => {
  return `/${getOrgUniqueName()}/projects/${projectName}/dashboard`
}

export const getProjectInvoiceTab = (projectName: string | undefined): string => {
  return `/${getOrgUniqueName()}/projects/${projectName}/invoice`
}

export const getProjectListUrl = (): string => {
  return `/${getOrgUniqueName()}/projects/list`
}

export const getProjectAddUrl = (): string => {
  return `/${getOrgUniqueName()}/projects/add`
}

export const getProjectEditUrl = (projectName: string | undefined): string => {
  return `/${getOrgUniqueName()}/projects/edit/${projectName}`
}
