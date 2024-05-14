// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { AppBarSearchType } from 'src/@fake-db/types'

// ** GET Search Data
mock.onGet('/app-bar/search').reply(config => {
  const { q = '', uniqueName } = config.params
  const queryLowered = q.toLowerCase()

  const searchData: AppBarSearchType[] = [
    {
      id: 1,
      url: `/${uniqueName}/dashboards`,
      icon: 'mdi:home-outline',
      title: 'Dashboard',
      category: 'dashboards'
    },
    {
      id: 2,
      url: `/${uniqueName}/projects/list`,
      icon: 'mdi:cube-outline',
      title: 'Project',
      category: 'appsPages'
    },
    {
      id: 3,
      url: `/${uniqueName}/invoice/list`,
      icon: 'mdi:file-document-outline',
      title: 'Invoice',
      category: 'appsPages'
    },
    {
      id: 4,
      url: `/${uniqueName}/projects/add`,
      icon: 'mdi:cube-outline',
      title: 'Project - Add',
      category: 'utilities'
    },
    {
      id: 5,
      url: `/${uniqueName}/invoice/add`,
      icon: 'mdi:file-document-outline',
      title: 'Invoice - Add',
      category: 'utilities'
    },
    {
      id: 6,
      url: `/${uniqueName}/users`,
      icon: 'mdi:account-outline',
      title: 'User Page',
      category: 'appsPages'
    },
    {
      id: 7,
      url: `/${uniqueName}/users`,
      icon: 'mdi:account-outline',
      title: 'User Page',
      category: 'appsPages'
    },
    {
      id: 8,
      url: `/${uniqueName}/settings/account`,
      icon: 'mdi:account-cog-outline',
      title: 'Settings - Account',
      category: 'settingsPages'
    },
    {
      id: 9,
      url: `/${uniqueName}/settings/security`,
      icon: 'mdi:account-security-outline',
      title: 'Settings - Security',
      category: 'settingsPages'
    },
    {
      id: 10,
      url: `/${uniqueName}/settings/organization`,
      icon: 'mdi:map-marker-account-outline',
      title: 'Settings - Organization',
      category: 'settingsPages'
    }
  ]

  const exactData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: [],
    settingsPages: [],
    utilities: []
  }

  const includeData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: [],
    settingsPages: [],
    utilities: []
  }

  searchData.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5) {
      exactData[obj.category].push(obj)
    }
  })

  searchData.forEach(obj => {
    const isMatched =
      !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5) {
      includeData[obj.category].push(obj)
    }
  })

  const categoriesCheck: string[] = []

  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0) {
      categoriesCheck.push(category)
    }
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })
  }

  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  return [
    200,
    [
      ...exactData.dashboards.concat(includeData.dashboards).slice(0, resultsLength),
      ...exactData.appsPages.concat(includeData.appsPages).slice(0, resultsLength),
      ...exactData.settingsPages.concat(includeData.settingsPages).slice(0, resultsLength),
      ...exactData.utilities.concat(includeData.utilities).slice(0, resultsLength)
    ]
  ]
})
