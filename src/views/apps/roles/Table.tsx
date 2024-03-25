// ** React Imports
import { useEffect, useCallback, useState, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getOrganizationDefaultHomeUrl } from 'src/utils/router/organization'
import { getInitials } from 'src/@core/utils/get-initials'
import { getOrgId } from 'src/utils/localStorage'
import { isAdmin } from 'src/utils/role'

// ** Actions Imports
import { deleteUser, fetchAdminCount, fetchUser, updateUser } from 'src/store/apps/user'
import { fetchRole } from 'src/store/apps/role'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { OrganizationProfileResponseDto, OrganizationUserResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import DialogEditUserRole from './dialogs/DialogEditUserRole'
import DialogDeleteUser from './dialogs/DialogDeleteUser'
import AddUserDrawer from '../user/list/AddUserDrawer'

// ** Hook Imports
import { useTranslation } from 'react-i18next'

// ** Next Auth Imports
import { useSession } from 'next-auth/react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface CellType {
  row: OrganizationUserResponseDto
}

// ** renders client column
const renderClient = (row: OrganizationUserResponseDto) => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color='primary' sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const UserList = () => {
  // ** State
  const [showDialogEditUserRole, setShowDialogEditUserRole] = useState<boolean>(false)
  const [showDialogDeleteUser, setShowDialogDeleteUser] = useState<boolean>(false)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [isSelectAdmin, setIsSelectAdmin] = useState(false)
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [selectedOrganizationUser, setSelectedOrganizationUser] = useState<OrganizationUserResponseDto | null>(null)
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])

  // ** Hooks
  const session = useSession()
  const dispatch = useDispatch<AppDispatch>()
  const userStore = useSelector((state: RootState) => state.user)
  const roleStore = useSelector((state: RootState) => state.role)
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(
      fetchUser({
        role: role,
        query: value
      })
    )
    dispatch(fetchAdminCount())
    dispatch(fetchRole({ query: '' }))
  }, [dispatch, role, value])

  const hasOnlyOneAdmin = (): boolean => {
    return userStore.totalAdmins <= 1
  }

  const isUserOnlyAdmin = (): boolean => {
    if (!selectedOrganizationUser) return false

    return hasOnlyOneAdmin() && isAdmin(selectedOrganizationUser.roles)
  }

  const isUserLastAdmin = (user: OrganizationUserResponseDto): boolean => {
    return hasOnlyOneAdmin() && isAdmin(user.roles)
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handleEditUserRole = (orgUser: OrganizationUserResponseDto) => {
    const userRoleIds = orgUser.roles.map(role => role.id)

    userRoleIds.forEach(roleId => {
      const arr = selectedCheckbox
      if (selectedCheckbox.includes(roleId.toString())) {
        arr.splice(arr.indexOf(roleId.toString()), 1)
        setSelectedCheckbox([...arr])
      } else {
        arr.push(roleId.toString())
        setSelectedCheckbox([...arr])
      }
    })

    setSelectedOrganizationUser(orgUser)
    setShowDialogEditUserRole(true)
  }

  const onSubmitEditUserRole = () => {
    if (!selectedOrganizationUser) return
    const orgId = getOrgId()
    const data = {
      userId: selectedOrganizationUser.id,
      roleIds: selectedCheckbox.map(roleId => parseInt(roleId))
    }
    dispatch(updateUser(data))
    if (session.data && selectedOrganizationUser.id !== session.data.user.id) {
      setShowDialogEditUserRole(false)
      setSelectedCheckbox([])

      return
    }
    const organization =
      session.data && session.data.user.organizations.find((org: OrganizationProfileResponseDto) => org.id === orgId)!
    window.location.assign(getOrganizationDefaultHomeUrl(organization?.uniqueName))
  }

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId))

    setShowDialogDeleteUser(false)
    setSelectedOrganizationUser(null)
  }

  const toggleAddUserDrawer = () => {
    setAddUserOpen(!addUserOpen)
    setIsSelectAdmin(false)
  }

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'name',
      headerName: `${t('role_page.user.user')}`,
      renderCell: ({ row }: CellType) => {
        const { name, email } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                component={Link}
                href='/apps/user/view/overview/'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {name}
              </Typography>
              <Typography noWrap variant='caption'>
                {`@${email.split('@')[0]}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: `${t('role_page.user.email')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.email || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 150,
      headerName: `${t('role_page.user.role')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              '& svg': { mr: 3, color: 'primary' }
            }}
          >
            {row.roles.map(role => (
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }} key={role.id}>
                {role.name || '-'}
              </Typography>
            ))}
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'phone',
      headerName: `${t('role_page.user.phone')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.phone || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'address',
      headerName: `${t('role_page.user.address')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.address || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: `${t('role_page.user.actions')}`,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('update', 'user') && (
            <IconButton color='info' onClick={() => handleEditUserRole(row)}>
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          )}
          {ability?.can('delete', 'user') && (
            <>
              <IconButton
                color='error'
                disabled={isUserLastAdmin(row)}
                onClick={() => {
                  setShowDialogDeleteUser(true)
                  setSelectedOrganizationUser(row)
                }}
              >
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
              {isUserLastAdmin(row) && (
                <Tooltip placement='top' title={t('role_page.user.cannot_delete_last_admin')}>
                  <Box sx={{ display: 'flex' }}>
                    <Icon icon='mdi:information-outline' fontSize='1rem' />
                  </Box>
                </Tooltip>
              )}
            </>
          )}
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            role={role}
            value={value}
            allRoles={roleStore.data}
            handleFilter={handleFilter}
            handleRoleChange={handleRoleChange}
            toggleAddUserDrawer={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rows={userStore.data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowHeight={() => 'auto'}
          />
        </Card>
      </Grid>
      <DialogEditUserRole
        show={showDialogEditUserRole}
        setShow={setShowDialogEditUserRole}
        allRoles={roleStore.data}
        selectedCheckbox={selectedCheckbox}
        setSelectedCheckbox={setSelectedCheckbox}
        isUserOnlyAdmin={isUserOnlyAdmin}
        handleEditUserRole={onSubmitEditUserRole}
      />
      <DialogDeleteUser
        show={showDialogDeleteUser}
        setShow={setShowDialogDeleteUser}
        userId={selectedOrganizationUser?.id || 0}
        handleDelete={handleDeleteUser}
        setSelectedOrganizationUser={setSelectedOrganizationUser}
      />
      <AddUserDrawer
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        allRoles={roleStore.data}
        isSelectAdmin={isSelectAdmin}
        setIsSelectAdmin={setIsSelectAdmin}
      />
    </Grid>
  )
}

export default UserList
