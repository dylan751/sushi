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
import { OrganizationUserResponseDto } from 'src/__generated__/AccountifyAPI'

interface DialogDeleteUserProps {
  show: boolean
  setShow: (value: boolean) => void
  userId: number
  handleDelete: (userId: number) => void
  setSelectedOrganizationUser: (value: OrganizationUserResponseDto | null) => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogDeleteUser = (props: DialogDeleteUserProps) => {
  const { show, setShow, userId, handleDelete, setSelectedOrganizationUser } = props

  const handleClose = () => {
    setShow(false)
    setSelectedOrganizationUser(null)
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
            Remove User Confirmation
          </Typography>
          <Typography variant='body2'>
            If this user does not belong to other organizations, it will be deleted.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => handleDelete(userId)}>
          Delete
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleClose}>
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteUser
