// ** React Imports
import { useState, useEffect, ReactElement, SyntheticEvent, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
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

// ** Components
import DashboardTab from 'src/views/pages/project/dashboard'
import InvoiceTab from 'src/views/pages/project/invoice'
import BudgetTab from 'src/views/pages/project/budget'
import CategoryTab from 'src/views/pages/project/category'
import ProjectHeader from 'src/views/pages/project/ProjectHeader'
import { getOrgUniqueName } from 'src/utils/organization'
import { ProjectResponseDto } from 'src/__generated__/AccountifyAPI'
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
    minHeight: 38,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const Project = ({
  tab,
  name,
  id,
  project
}: {
  tab: string
  name: string
  id: number
  project: ProjectResponseDto
}) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/${getOrgUniqueName()}/projects/${name}/${value.toLowerCase()}`
      })
      .then(() => setIsLoading(false))
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList: { [key: string]: ReactElement } = {
    dashboard: <DashboardTab projectId={id} />,
    invoice: <InvoiceTab projectId={id} name={name} />,
    budget: <BudgetTab projectId={id} />,
    category: <CategoryTab projectId={id} />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProjectHeader project={project} />
      </Grid>
      {activeTab === undefined ? null : (
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
                  {ability?.can('read', 'project') && (
                    <Tab
                      value='dashboard'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:account-outline' />
                          {!hideText && t('project_page.tab.dashboard')}
                        </Box>
                      }
                    />
                  )}
                  {ability?.can('read', 'invoice') && (
                    <Tab
                      value='invoice'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:account-multiple-outline' />
                          {!hideText && t('project_page.tab.invoice')}
                        </Box>
                      }
                    />
                  )}
                  {ability?.can('read', 'budget') && (
                    <Tab
                      value='budget'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:view-grid-outline' />
                          {!hideText && t('project_page.tab.budget')}
                        </Box>
                      }
                    />
                  )}
                  {ability?.can('read', 'category') && (
                    <Tab
                      value='category'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:link' />
                          {!hideText && t('project_page.tab.category')}
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
      )}
    </Grid>
  )
}

export default Project
