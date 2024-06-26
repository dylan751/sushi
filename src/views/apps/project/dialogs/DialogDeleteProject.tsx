// ** React Imports
import { Ref, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

interface DialogDeleteProjectProps {
  show: boolean
  setShow: (value: boolean) => void
  projectId: number
  handleDelete: (projectId: number) => void
  setSelectedProject: (value: ProjectResponseDto | null) => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogDeleteProject = (props: DialogDeleteProjectProps) => {
  // ** Props
  const { show, setShow, projectId, handleDelete, setSelectedProject } = props

  // ** Hooks
  const { t } = useTranslation()

  const handleClose = () => {
    setShow(false)
    setSelectedProject(null)
  }

  return (
    <Dialog fullWidth open={show} maxWidth='sm' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            {t('project_page.list.remove_project_dialog_title')}
          </Typography>
          <Typography variant='body2'>{t('project_page.list.remove_project_dialog_subtitle')}</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => handleDelete(projectId)}>
          {t('button.delete')}
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleClose}>
          {t('button.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteProject
