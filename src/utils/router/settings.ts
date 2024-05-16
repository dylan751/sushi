import { getOrgUniqueName } from '../organization'

export const getSettingsAccountUrl = (): string => {
  return `/${getOrgUniqueName()}/settings/account`
}
