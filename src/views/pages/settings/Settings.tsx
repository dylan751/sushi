// ** React Imports
import { ReactElement, useState, useEffect, SyntheticEvent, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Tabs Imports
import TabAccount from 'src/views/pages/settings/TabAccount'
import TabSecurity from 'src/views/pages/settings/TabSecurity'
import TabOrganization from 'src/views/pages/settings/TabOrganization'

// ** Util Imports
import { getOrgUniqueName } from 'src/utils/organization'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const Settings = ({ tab }: { tab: string }) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
  const router = useRouter()
  const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true)
    router.push(`/${getOrgUniqueName()}/settings/${value.toLowerCase()}`).then(() => setIsLoading(false))
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList: { [key: string]: ReactElement } = {
    account: <TabAccount />,
    security: <TabSecurity />,
    organization: <TabOrganization />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList
                variant='scrollable'
                scrollButtons='auto'
                onChange={handleChange}
                aria-label='customized tabs example'
              >
                <Tab
                  value='account'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:account-outline' />
                      {!hideText && t('settings_page.account.title')}
                    </Box>
                  }
                />
                <Tab
                  value='security'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:lock-open-outline' />
                      {!hideText && t('settings_page.security.title')}
                    </Box>
                  }
                />
                {ability?.can('read', 'organization') && (
                  <Tab
                    value='organization'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon icon='mdi:office-building-outline' />
                        {!hideText && t('settings_page.organization.title')}
                      </Box>
                    }
                  />
                )}
              </TabList>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              {isLoading ? (
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default Settings
