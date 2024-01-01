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
      url: `/${uniqueName}/dashboards/analytics`,
      icon: 'mdi:home-outline',
      title: 'Analytics Dashboard',
      category: 'dashboards'
    },
    {
      id: 2,
      url: `/${uniqueName}/roles`,
      icon: 'mdi:shield-outline',
      title: 'Role Page',
      category: 'appsPages'
    },
    {
      id: 3,
      url: `/${uniqueName}/users`,
      icon: 'mdi:account-outline',
      title: 'User Page',
      category: 'appsPages'
    },
    {
      id: 23,
      url: `/${uniqueName}/account-settings/account`,
      icon: 'mdi:account-cog-outline',
      title: 'Account Settings',
      category: 'appsPages'
    },
    {
      id: 24,
      url: `/${uniqueName}/account-settings/security`,
      icon: 'mdi:lock-open-outline',
      title: 'Account Settings - Security',
      category: 'appsPages'
    }
  ]

  const exactData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: []
  }

  const includeData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: []
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
      ...exactData.appsPages.concat(includeData.appsPages).slice(0, resultsLength)
    ]
  ]
})
