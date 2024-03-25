import { getOrgUniqueName } from '../organization'

export const getDashboardAnalyticsUrl = (): string => {
  return `/${getOrgUniqueName()}/dashboards/analytics`
}
