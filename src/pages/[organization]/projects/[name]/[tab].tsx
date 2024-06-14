// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** Components Imports
import Project from 'src/views/pages/project/Project'

// ** Type Imports
import Error404 from 'src/pages/404'
import { ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchAProject, fetchProject } from 'src/store/apps/organization/project'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

// ** MUI Imports
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// ** Utils Imports
import { getProjectDefaultTab } from 'src/utils/router'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  border: 0,
  marginRight: 0,
  overflow: 'visible',
  '& .MuiTabs-flexContainer': {
    flexDirection: 'column'
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minHeight: 40,
    minWidth: 150,
    maxWidth: 200,
    textAlign: 'start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      maxWidth: '100%'
    }
  }
}))

const tab = ['dashboard', 'invoice', 'budget', 'category']

const ProjectsTab = () => {
  const router = useRouter()
  const name = router.query.name as string
  const projectStore = useSelector((state: RootState) => state.project)

  // ** States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentProjectName, setCurrentProjectName] = useState<string>(name)

  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const { organizationId, project, projectId } = useCurrentOrganization(name)

  const currentTab = window.location.pathname.split('/')[4]

  useEffect(() => {
    // Fetch organization's projects
    dispatch(fetchAProject({ organizationId, id: projectId! }))
    dispatch(fetchProject({ organizationId }))
  }, [dispatch, projectId, organizationId, projectStore.projects])

  useEffect(() => {
    setCurrentProjectName(name)
  }, [name])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setIsLoading(true)
    router.push({ pathname: getProjectDefaultTab(newValue) }).then(() => setIsLoading(false))
  }

  const renderTabs = () => {
    return (
      projectStore.projects &&
      projectStore.projects.map((project: ProjectResponseDto) => (
        <Tab key={project.id} value={project.name} label={project.name} />
      ))
    )
  }

  if (!tab.includes(currentTab) || !project) {
    return <Error404 />
  }

  return (
    <TabContext value={currentProjectName}>
      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'] }}>
        <Box sx={{ mr: [0, 0, 9], mb: [5, 5, 0], display: 'flex', flexDirection: 'column' }}>
          <Typography key='2' variant='h6' sx={{ color: `${theme.palette.primary.main} !important`, mb: '8px' }}>
            {currentProjectName}
          </Typography>
          <TabList orientation='vertical' onChange={handleChange} aria-label='vertical tabs example'>
            {renderTabs()}
          </TabList>
        </Box>
        {isLoading ? (
          <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Project tab={currentTab} name={name} id={projectId!} />
        )}
      </Box>
    </TabContext>
  )
}

ProjectsTab.acl = {
  action: 'read',
  subject: 'project'
}

export default ProjectsTab
