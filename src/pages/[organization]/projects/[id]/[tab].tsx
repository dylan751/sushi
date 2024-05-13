// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { useEffect } from 'react'

// ** Components Imports
import Project from 'src/views/pages/project/Project'

// ** Type Imports
import Error404 from 'src/pages/404'
import { ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchAProject } from 'src/store/apps/organization/project'
import { useCurrentOrganization } from 'src/hooks'

const tab = ['dashboard', 'invoice', 'budget', 'category']

const ProjectsTab = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { organizationId } = useCurrentOrganization()
  const router = useRouter()
  const store = useSelector((state: RootState) => state.project)

  const id = router.query.id as string
  const currentTab = window.location.pathname.split('/')[4]

  useEffect(() => {
    // Fetch organization's projects
    dispatch(fetchAProject({ organizationId, id: parseInt(id) }))
  }, [dispatch, id, organizationId])

  if (!tab.includes(currentTab)) {
    return <Error404 />
  }

  return <Project tab={currentTab} id={id} project={store.project as ProjectResponseDto} />
}

ProjectsTab.acl = {
  action: 'read',
  subject: 'project'
}

export default ProjectsTab
