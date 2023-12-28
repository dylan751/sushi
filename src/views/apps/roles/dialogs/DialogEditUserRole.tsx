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
import { Checkbox, FormControlLabel, FormGroup, Tooltip, tooltipClasses } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import { RoleResponseDto } from 'src/__generated__/AccountifyAPI'
import {
  areSelectedRolesValid,
  isRoleDisabled,
  getDisabledTooltipTextArgs,
  getRoleErrorMessageArgs
} from 'src/utils/role'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

interface DialogEditUserRoleProps {
  show: boolean
  setShow: (value: boolean) => void
  allRoles: RoleResponseDto[]
  selectedCheckbox: string[]
  setSelectedCheckbox: (value: string[]) => void
  isUserOnlyAdmin: () => boolean
  handleEditUserRole: () => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogEditUserRole = (props: DialogEditUserRoleProps) => {
  // ** Props
  const { show, setShow, allRoles, selectedCheckbox, setSelectedCheckbox, isUserOnlyAdmin, handleEditUserRole } = props

  // ** Hooks
  const { t } = useTranslation()

  const roleDisabled = (role: RoleResponseDto): boolean => {
    return isRoleDisabled(
      role,
      selectedCheckbox.map(roleId => parseInt(roleId)),
      isUserOnlyAdmin()
    )
  }

  const getDisabledButtonTooltipText = (): string => {
    if (areSelectedRolesValid(selectedCheckbox.map(checkbox => parseInt(checkbox)))) return ''

    return t(getRoleErrorMessageArgs(selectedCheckbox.map(checkbox => parseInt(checkbox))))
  }

  const getDisabledTooltipText = (role: RoleResponseDto): string => {
    return getDisabledTooltipTextArgs(
      role,
      selectedCheckbox.map(roleId => parseInt(roleId)),
      isUserOnlyAdmin()
    )
  }

  const toggleRole = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleClose = () => {
    setShow(false)
    setSelectedCheckbox([])
  }

  return (
    <Dialog fullWidth open={show} maxWidth='xs' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton
          size='small'
          onClick={() => setShow(false)}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            {t('role_page.user.edit_user_role_dialog_title')}
          </Typography>
        </Box>
        <FormGroup row sx={{ display: 'flex', flexDirection: 'column' }}>
          {allRoles.map((item, index) => (
            <Tooltip
              key={index}
              title={roleDisabled(item) && `${t(getDisabledTooltipText(item))}`}
              placement='top-start'
              slotProps={{
                popper: {
                  sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
                      marginBottom: '0px'
                    }
                  }
                }
              }}
            >
              <FormControlLabel
                label={item.name}
                control={
                  <Checkbox
                    id={item.id.toString()}
                    onChange={() => toggleRole(item.id.toString())}
                    checked={selectedCheckbox.includes(item.id.toString())}
                    disabled={roleDisabled(item)}
                  />
                }
              />
            </Tooltip>
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={getDisabledButtonTooltipText()} placement='top-start'>
            <span>
              <Button
                variant='contained'
                color='primary'
                sx={{ mr: 1 }}
                onClick={handleEditUserRole}
                disabled={!areSelectedRolesValid(selectedCheckbox.map(checkbox => parseInt(checkbox)))}
              >
                {t('button.edit')}
              </Button>
            </span>
          </Tooltip>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            {t('button.cancel')}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEditUserRole
