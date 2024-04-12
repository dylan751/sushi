export const getProjectDefaultTab = (orgUniqueName: string | undefined, id: number): string => {
  return `/${orgUniqueName}/projects/${id}/dashboard`
}
