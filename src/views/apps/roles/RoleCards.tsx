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
import { addRole, deleteRole, fetchData, updateRole } from 'src/store/apps/role'

// ** Hooks
import { useApi } from 'src/hooks/useApi'

// ** Third parties Imports
import { Controller, FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DialogDeleteRole from './dialogs/DialogDeleteRole'

const cardDummyData = {
  totalUsers: 5,
  avatars: ['4.png', '5.png', '6.png', '7.png', '8.png']
}

const RolesCards = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { $api } = useApi()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.role)

  // ** States
  const [showDialogDeleteRole, setShowDialogDeleteRole] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
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

    toast.success('Delete role succeed')
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

    toast.success(`${dialogTitle} role succeed`)
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

  useEffect(() => {
    const fetchPermissionSubjects = async () => {
      const response = await $api.internal.getPermissionSubjectList()
      const subjects = response.data.filter(item => item.subject !== 'all') // Exclude 'all' from permission subjects response list
      const filteredSubjects = subjects.map(item => item.subject.charAt(0).toUpperCase() + item.subject.slice(1)) // Uppercase the first letter
      setPermissionSubjects(filteredSubjects)
    }

    // Fetch organization's roles
    dispatch(fetchData())

    // Fetch all permission subjects
    fetchPermissionSubjects()
  }, [dispatch, $api.internal])

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
              <Typography variant='body2'>{`Total ${cardDummyData.totalUsers} users`}</Typography>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
                {cardDummyData.avatars.map((img, index: number) => (
                  <Avatar key={index} alt={item.name} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h6'>{item.name}</Typography>
                {ability?.can('update', 'role') && (
                  <Typography
                    href='/'
                    variant='body2'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                    onClick={e => {
                      e.preventDefault()
                      handleClickOpenEdit(item.id)
                      setDialogTitle('Edit')
                    }}
                  >
                    {item.isCustom ? 'Edit' : 'Show'} Role
                  </Typography>
                )}
              </Box>
              {item.isCustom && (
                <IconButton
                  sx={{ color: 'error.light' }}
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
        <DialogDeleteRole
          show={showDialogDeleteRole}
          setShow={setShowDialogDeleteRole}
          roleId={selectedRole?.id || 0}
          handleDelete={handleDelete}
        />
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      {ability?.can('create', 'role') && (
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleClickOpenAdd()
              setDialogTitle('Add')
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
                        setDialogTitle('Add')
                      }}
                    >
                      Add Role
                    </Button>
                    <Typography>Add role, if it doesn't exist.</Typography>
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
            {`${dialogTitle} Role`}
          </Typography>
          <Typography variant='body2'>Set Role Permissions</Typography>
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
                      label='Role Name'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Enter Role Name'
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Typography variant='h6'>Role Permissions</Typography>
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
                        Administrator Access
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon='mdi:information-outline' fontSize='1rem' />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label='Select All'
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
                            label='Create'
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
                            label='Read'
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
                            label='Update'
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
                            label='Delete'
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
            <Box className='demo-space-x'>
              <Button
                size='large'
                type='submit'
                variant='contained'
                disabled={selectedRole && !selectedRole.isCustom ? true : false}
              >
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
            {selectedRole && !selectedRole.isCustom && (
              <Typography variant='body2' color='error'>
                This is the default role, you shouldn't edit this
              </Typography>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
