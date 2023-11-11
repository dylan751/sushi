// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getOrgId } from 'src/utils/localStorage'

// ** Actions Imports
import { fetchAdminCount, fetchUser, updateUser } from 'src/store/apps/user'
import { fetchRole } from 'src/store/apps/role'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { OrganizationProfileResponseDto, OrganizationUserResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import DialogEditUserRole from './dialogs/DialogEditUserRole'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

interface CellType {
  row: OrganizationUserResponseDto
}

// ** renders client column
const renderClient = (row: OrganizationUserResponseDto) => {
  return (
    <CustomAvatar skin='light' color='primary' sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
      {getInitials(row.name ? row.name : 'John Doe')}
    </CustomAvatar>
  )
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'User',
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
              {`@${email}`}
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
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'Role',
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
              {role.name}
            </Typography>
          ))}
        </Box>
      )
    }
  }
]

const UserList = () => {
  // ** State
  const [showDialogEditUserRole, setShowDialogEditUserRole] = useState<boolean>(false)
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [selectedOrganizationUser, setSelectedOrganizationUser] = useState<OrganizationUserResponseDto | null>(null)
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const userStore = useSelector((state: RootState) => state.user)
  const roleStore = useSelector((state: RootState) => state.role)
  const { user } = useAuth()

  useEffect(() => {
    dispatch(
      fetchUser({
        role: role,
        query: value
      })
    )
    dispatch(fetchAdminCount())
    dispatch(fetchRole())
  }, [dispatch, role, value])

  const hasOnlyOneAdmin = (): boolean => {
    return userStore.totalAdmins <= 1
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
    if (selectedOrganizationUser.id !== user!.id) {
      setShowDialogEditUserRole(false)
      setSelectedCheckbox([])

      return
    }
    const organization = user!.organizations.find((org: OrganizationProfileResponseDto) => org.id === orgId)!
    window.location.assign(`/${organization.uniqueName}/home`)
  }

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='info' onClick={() => handleEditUserRole(row)}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
          </IconButton>
          <IconButton color='error'>
            <Icon icon='mdi:delete-outline' fontSize={20} />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader role={role} value={value} handleFilter={handleFilter} handleRoleChange={handleRoleChange} />
          <DataGrid
            autoHeight
            rows={userStore.data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <DialogEditUserRole
        show={showDialogEditUserRole}
        setShow={setShowDialogEditUserRole}
        selectedOrganizationUser={selectedOrganizationUser}
        allRoles={roleStore.data}
        selectedCheckbox={selectedCheckbox}
        setSelectedCheckbox={setSelectedCheckbox}
        hasOnlyOneAdmin={hasOnlyOneAdmin}
        handleEditUserRole={onSubmitEditUserRole}
      />
    </Grid>
  )
}

export default UserList
