// ** Components Imports
import Error404 from 'src/pages/404'
import AccountSettings from 'src/views/pages/account-settings/AccountSettings'

const tab = ['account', 'security']

const AccountSettingsTab = () => {
  const currentTab = window.location.pathname.split('/')[3]
  if (!tab.includes(currentTab)) {
    return <Error404 />
  }

  return <AccountSettings tab={currentTab} />
}

AccountSettingsTab.acl = {
  action: 'read',
  subject: 'account-settings'
}

export default AccountSettingsTab
