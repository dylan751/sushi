// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Util Imports
import { getProjectListUrl } from 'src/utils/router'
import { useTranslation } from 'react-i18next'

export interface ProjectHeaderProps {
  project: ProjectResponseDto
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' onClick={() => router.replace(getProjectListUrl())}>
      {t('project_page.list.project_list')}
    </Link>,
    <Typography key='2' color='info.main'>
      {project.name}
    </Typography>
  ]

  return (
    <Breadcrumbs separator={<Icon fontSize={20} icon='mdi:chevron-right' />} aria-label='breadcrumb'>
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default ProjectHeader
