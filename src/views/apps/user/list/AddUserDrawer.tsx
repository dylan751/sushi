// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { addUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { BulkInviteRequestDto, RoleResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils Imports
import { ADMIN_ROLE_ID } from 'src/utils/role'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  allRoles: RoleResponseDto[]
  isSelectAdmin: boolean
  setIsSelectAdmin: (val: boolean) => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  defaultRole: yup.string().required(),
  customRole: yup.string()
})

const defaultValues = {
  email: '',
  defaultRole: '',
  customRole: ''
}

export interface InviteUserData {
  email: string
  defaultRole: string
  customRole: string
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, allRoles, isSelectAdmin, setIsSelectAdmin } = props

  // ** Hooks
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: InviteUserData) => {
    const roleIds = [parseInt(data.defaultRole)]
    if (data.customRole && !isSelectAdmin) {
      roleIds.push(parseInt(data.customRole))
    }
    const inviteUsersRequest: BulkInviteRequestDto = {
      emails: data.email.split(','),
      roleIds
    }

    dispatch(addUser(inviteUsersRequest))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t('role_page.user.add_user')}</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label={`${t('role_page.user.email')} *`}
                  onChange={onChange}
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='defaultRole'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <InputLabel id='default-role-select'>{t('role_page.user.default_role')} *</InputLabel>
                  <Select
                    fullWidth
                    value={value}
                    id='default-role'
                    label={t('role_page.user.default_role')}
                    labelId='default-role'
                    onChange={e => {
                      onChange(e.target.value)
                      if (parseInt(e.target.value) === ADMIN_ROLE_ID) {
                        setIsSelectAdmin(true)
                      } else {
                        setIsSelectAdmin(false)
                      }
                    }}
                    inputProps={{ placeholder: t('role_page.user.default_role').toString() }}
                  >
                    {allRoles.map(
                      role =>
                        !role.isCustom && (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        )
                    )}
                  </Select>
                </>
              )}
            />
            {errors.defaultRole && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.defaultRole.message}</FormHelperText>
            )}
          </FormControl>
          {!isSelectAdmin && (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='customRole'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputLabel id='custom-role'>{t('role_page.user.custom_role_optional')}</InputLabel>
                    <Select
                      fullWidth
                      value={value}
                      id='custom-role'
                      label={t('role_page.user.custom_role')}
                      labelId='custom-role'
                      onChange={onChange}
                      inputProps={{ placeholder: t('role_page.user.custom_role_optional').toString() }}
                    >
                      {allRoles.map(
                        role =>
                          role.isCustom && (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          )
                      )}
                    </Select>
                  </>
                )}
              />
              {errors.customRole && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.customRole.message}</FormHelperText>
              )}
            </FormControl>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {t('button.submit')}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('button.cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
