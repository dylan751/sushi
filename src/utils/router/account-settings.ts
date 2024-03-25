import { getOrgUniqueName } from '../organization'

export const getAccountSettingsAccountUrl = (): string => {
  return `/${getOrgUniqueName()}/account-settings/account`
}
