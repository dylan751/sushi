// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { useEffect } from 'react'

// ** Components Imports
import Project from 'src/views/pages/project/Project'

// ** Type Imports
import Error404 from 'src/pages/404'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchAProject } from 'src/store/apps/organization/project'
import { useCurrentOrganization } from 'src/hooks'

const tab = ['dashboard', 'invoice', 'budget', 'category']

const ProjectsTab = () => {
  const router = useRouter()
  const name = router.query.name as string

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { organizationId, project, projectId } = useCurrentOrganization(name)

  const currentTab = window.location.pathname.split('/')[4]

  useEffect(() => {
    // Fetch organization's projects
    dispatch(fetchAProject({ organizationId, id: projectId! }))
  }, [dispatch, projectId, organizationId])

  if (!tab.includes(currentTab)) {
    return <Error404 />
  }

  return <Project tab={currentTab} name={name} id={projectId!} project={project!} />
}

ProjectsTab.acl = {
  action: 'read',
  subject: 'project'
}

export default ProjectsTab
