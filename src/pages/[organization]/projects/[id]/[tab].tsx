// ** Next Imports
import { useRouter } from 'next/router'

// ** Components Imports
import Project from 'src/views/pages/project/Project'

// ** Types
import Error404 from 'src/pages/404'

const tab = ['dashboard', 'invoice', 'budget', 'category']

const ProjectsTab = () => {
  const router = useRouter()
  const id = router.query.id as string
  const currentTab = window.location.pathname.split('/')[4]
  if (!tab.includes(currentTab)) {
    return <Error404 />
  }

  return <Project tab={currentTab} id={id} />
}

export default ProjectsTab
