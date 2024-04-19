// ** MUI Components
import Typography from '@mui/material/Typography'

// ** Type Imports
import { ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

export interface ProjectHeaderProps {
  project: ProjectResponseDto
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <Typography variant='h5' sx={{ fontWeight: 600, lineHeight: 1.05 }}>
      {project.name}
    </Typography>
  )
}

export default ProjectHeader
