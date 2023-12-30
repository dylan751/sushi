// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import {
  CreateRoleRequestDto,
  PermissionConfigDtoActionEnum,
  PermissionConfigDtoSubjectEnum,
  RoleResponseDto
} from 'src/__generated__/AccountifyAPI'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { addRole, deleteRole, fetchRole, updateRole } from 'src/store/apps/role'

// ** Third Party Imports
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import DialogDeleteRole from './dialogs/DialogDeleteRole'

// ** Util Imports
import { MAX_ROLES_PER_ORGANIZATION } from 'src/utils/role'

// ** Axios Imports
import { $api } from 'src/utils/api'

// ** Next Auth
import { useSession } from 'next-auth/react'

const cardDummyData = {
  totalUsers: 5,
  avatars: ['4.png', '5.png', '6.png', '7.png', '8.png']
}

const RolesCards = () => {
  // ** Hooks
  const session = useSession()
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.role)

  // ** States
  const [showDialogDeleteRole, setShowDialogDeleteRole] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState(t('role_page.role.add'))
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [permissionSubjects, setPermissionSubjects] = useState<string[]>([])
  const [selectedRole, setSelectedRole] = useState<RoleResponseDto | null>(null)

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    values: { name: selectedRole ? selectedRole.name : '' }
  })

  const handleClickOpenAdd = () => setOpen(true)

  const handleClickOpenEdit = (roleId: number) => {
    const role = store.data.find(role => role.id === roleId)!
    role.permissions.forEach((permission: any) => {
      if (permission.action === 'manage' && permission.subject === 'all') {
        handleSelectAllCheckbox()
      } else {
        togglePermission(`${permission.action}-${permission.subject}`)
      }
    })

    setSelectedRole(role)
    setOpen(true)
  }

  const handleDelete = (roleId: number) => {
    dispatch(deleteRole(roleId))

    setShowDialogDeleteRole(false)
    setSelectedRole(null)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
    setSelectedRole(null)
  }

  const onSubmit = (data: FieldValues) => {
    const createOrUpdateRoleRequest: CreateRoleRequestDto = {
      name: data.name,
      slug: data.name.toLowerCase().split(' ').join('-'),
      permissionConfigs: selectedCheckbox.map(checkbox => {
        const config = checkbox.split('-')

        return {
          action: config[0] as PermissionConfigDtoActionEnum,
          subject: config[1] as PermissionConfigDtoSubjectEnum
        }
      })
    }

    // Call api
    if (!selectedRole) {
      dispatch(addRole(createOrUpdateRoleRequest))
    } else if (selectedRole) {
      dispatch(updateRole({ ...createOrUpdateRoleRequest, roleId: selectedRole.id }))
    }

    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
    setSelectedRole(null)
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      permissionSubjects.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        togglePermission(`create-${id}`)
        togglePermission(`read-${id}`)
        togglePermission(`update-${id}`)
        togglePermission(`delete-${id}`)
      })
    }
  }

  const isSubmitDisabled = (): boolean => {
    if (selectedRole) {
      return !selectedRole.isCustom || !ability?.can('update', 'role')
    } else {
      return !ability?.can('create', 'role')
    }
  }

  useEffect(() => {
    const fetchPermissionSubjects = async () => {
      const response = await $api(session.data?.accessToken).internal.getPermissionSubjectList()
      const subjects = response.data.filter(item => item.subject !== 'all' && item.subject !== 'account-settings') // Exclude 'all' and 'account-settings' from permission subjects response list
      const filteredSubjects = subjects.map(item => item.subject.charAt(0).toUpperCase() + item.subject.slice(1)) // Uppercase the first letter
      setPermissionSubjects(filteredSubjects)
    }

    // Fetch organization's roles
    dispatch(fetchRole({ query: '' }))

    // Fetch all permission subjects
    fetchPermissionSubjects()
  }, [dispatch, session.data])

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < permissionSubjects.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox, permissionSubjects.length])

  const renderCards = () =>
    (store.data as RoleResponseDto[]).map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body2'>
                {t('role_page.role.total_users', {
                  totalUsers: cardDummyData.totalUsers
                })}
              </Typography>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
                {cardDummyData.avatars.map((img, index: number) => (
                  <Avatar key={index} alt={item.name} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={e => {
                    e.preventDefault()
                    handleClickOpenEdit(item.id)
                    setDialogTitle(t('role_page.role.edit'))
                  }}
                >
                  {item.isCustom ? t('role_page.role.edit_role') : t('role_page.role.show_role')}
                </Typography>
              </Box>
              {ability?.can('delete', 'role') && item.isCustom && (
                <IconButton
                  color='error'
                  onClick={() => {
                    setShowDialogDeleteRole(true)
                    setSelectedRole(item)
                  }}
                >
                  <Icon icon='mdi:delete-outline' fontSize={20} />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      {ability?.can('create', 'role') && store.data.length < MAX_ROLES_PER_ORGANIZATION && (
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleClickOpenAdd()
              setDialogTitle(t('role_page.role.add'))
            }}
          >
            <Grid container sx={{ height: '100%' }}>
              <Grid item xs={5}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <CardContent>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant='contained'
                      sx={{ mb: 3, whiteSpace: 'nowrap' }}
                      onClick={() => {
                        handleClickOpenAdd()
                        setDialogTitle(t('role_page.role.add'))
                      }}
                    >
                      {t('role_page.role.add_role')}
                    </Button>
                    <Typography>{t('role_page.role.add_role_if_not_exists')}</Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span'>
            {`${dialogTitle} ${t('role_page.role.role')}`}
          </Typography>
          <Typography variant='body2'>{t('role_page.role.set_role_permissions')}</Typography>
        </DialogTitle>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(5)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label={t('role_page.role.role_name')}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder={t('role_page.role.enter_role_name').toString()}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Typography variant='h6'>{t('role_page.role.role_permissions')}</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' }
                        }}
                      >
                        {t('role_page.role.administrator_access')}
                        <Tooltip placement='top' title={t('role_page.role.allow_full_access')}>
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon='mdi:information-outline' fontSize='1rem' />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label={t('role_page.role.select_all')}
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                        control={
                          <Checkbox
                            size='small'
                            onChange={handleSelectAllCheckbox}
                            indeterminate={isIndeterminateCheckbox}
                            checked={selectedCheckbox.length === permissionSubjects.length * 4}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionSubjects.map((i: string, index: number) => {
                    const id = i.toLowerCase().split(' ').join('-')

                    return (
                      <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            color: theme => `${theme.palette.text.primary} !important`
                          }}
                        >
                          {i}
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            label={t('role_page.role.create')}
                            control={
                              <Checkbox
                                size='small'
                                id={`create-${id}`}
                                onChange={() => togglePermission(`create-${id}`)}
                                checked={selectedCheckbox.includes(`create-${id}`)}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            label={t('role_page.role.read')}
                            control={
                              <Checkbox
                                size='small'
                                id={`read-${id}`}
                                onChange={() => togglePermission(`read-${id}`)}
                                checked={selectedCheckbox.includes(`read-${id}`)}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            label={t('role_page.role.update')}
                            control={
                              <Checkbox
                                size='small'
                                id={`update-${id}`}
                                onChange={() => togglePermission(`update-${id}`)}
                                checked={selectedCheckbox.includes(`update-${id}`)}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            label={t('role_page.role.delete')}
                            control={
                              <Checkbox
                                size='small'
                                id={`delete-${id}`}
                                onChange={() => togglePermission(`delete-${id}`)}
                                checked={selectedCheckbox.includes(`delete-${id}`)}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Tooltip
                title={selectedRole && !selectedRole.isCustom && t('role_page.role.should_not_edit')}
                placement='top-start'
              >
                <span>
                  <Button size='large' type='submit' variant='contained' disabled={isSubmitDisabled()}>
                    {t('button.submit')}
                  </Button>
                </span>
              </Tooltip>
              <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                {t('button.cancel')}
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <DialogDeleteRole
        show={showDialogDeleteRole}
        setShow={setShowDialogDeleteRole}
        roleId={selectedRole?.id || 0}
        handleDelete={handleDelete}
        setSelectedRole={setSelectedRole}
      />
    </Grid>
  )
}

export default RolesCards
