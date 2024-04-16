import { getOrgUniqueName } from '../organization'

export const getProjectDefaultTab = (id: number): string => {
  return `/${getOrgUniqueName()}/projects/${id}/dashboard`
}

export const getProjectListUrl = (): string => {
  return `/${getOrgUniqueName()}/projects/list`
}

export const getProjectEditUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/projects/edit/${id}`
}
