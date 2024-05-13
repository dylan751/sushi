// ** Components Imports
import Error404 from 'src/pages/404'
import Settings from 'src/views/pages/settings/Settings'

const tab = ['account', 'security', 'organization']

const SettingsTab = () => {
  const currentTab = window.location.pathname.split('/')[3]
  if (!tab.includes(currentTab)) {
    return <Error404 />
  }

  return <Settings tab={currentTab} />
}

SettingsTab.acl = {
  action: 'read',
  subject: 'settings'
}

export default SettingsTab
