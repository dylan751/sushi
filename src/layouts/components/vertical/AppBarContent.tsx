// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserLanguageDropdown from '../UserLanguageDropdown'
import UserDropdown from 'src/layouts/components/UserDropdown'

// ** Context Imports
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { calculateBudgetProcess } from 'src/utils/budget'

// ** Utils Imports
import { format } from 'date-fns'
import NotificationDropdown, { NotificationsType } from '../shared-components/UserNotificationDropdown'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const statisticsStore = useSelector((state: RootState) => state.organizationStatistics)

  const notifications: (NotificationsType & { projectName: string })[] = []

  statisticsStore.statistics.projects?.map(project => {
    const budgetProcess = calculateBudgetProcess(project.totalSpent, project.totalBudget)

    if (budgetProcess > 100) {
      notifications.push({
        meta: format(new Date(), 'dd MMM'),
        avatarColor: 'error',
        subtitle: `Project's budget exceeded at ${budgetProcess}%`,
        avatarText: project.name,
        title: `${project.name} Budget Exceeded!`,
        projectName: project.name
      })
    } else if (budgetProcess > 75) {
      notifications.push({
        meta: format(new Date(), 'dd MMM'),
        avatarColor: 'warning',
        subtitle: `Project's budget has reached over ${budgetProcess}%, please be careful!`,
        avatarText: project.name,
        title: `${project.name} Budget Warning!`,
        projectName: project.name
      })
    }
  })

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        <Autocomplete hidden={hidden} settings={settings} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserLanguageDropdown settings={settings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown settings={settings} notifications={notifications} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
