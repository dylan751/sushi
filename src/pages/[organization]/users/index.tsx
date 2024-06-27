// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, useContext } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserCardStatsHorizontal from 'src/layouts/components/card-statistics/user-card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { isAdmin } from 'src/utils/role'

// ** Actions Imports
import { fetchUser, deleteUser, fetchAdminCount } from 'src/store/apps/organization/user'
import { fetchRole } from 'src/store/apps/organization/role'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UserCardStatsHorizontalProps } from 'src/layouts/components/card-statistics/types'
import { OrganizationUserResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import DialogDeleteUser from 'src/views/apps/roles/dialogs/DialogDeleteUser'

// ** Hooks
import { useTranslation } from 'react-i18next'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

// ** Constant Imports
import { MenuProps } from 'src/constants'

interface CellType {
  row: OrganizationUserResponseDto
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

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

const RowOptions = ({
  row,
  isUserLastAdmin,
  setShowDialogDeleteUser,
  setSelectedOrganizationUser
}: {
  row: OrganizationUserResponseDto
  isUserLastAdmin: (user: OrganizationUserResponseDto) => boolean
  setShowDialogDeleteUser: (value: boolean) => void
  setSelectedOrganizationUser: (value: OrganizationUserResponseDto | null) => void
}) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {ability?.can('delete', 'user') && (
          <MenuItem sx={{ '& svg': { mr: 2 } }}>
            <Button
              color='error'
              disabled={isUserLastAdmin(row)}
              onClick={() => {
                setShowDialogDeleteUser(true)
                setSelectedOrganizationUser(row)
                handleRowOptionsClose()
              }}
              sx={{ p: 0, m: 0, mr: 2 }}
            >
              <Icon icon='mdi:delete-outline' fontSize={20} />
              {t('button.delete')}
            </Button>
            {isUserLastAdmin(row) && (
              <Tooltip placement='top' title={t('role_page.user.cannot_delete_last_admin')}>
                <Box sx={{ display: 'flex' }}>
                  <Icon icon='mdi:information-outline' fontSize='1rem' />
                </Box>
              </Tooltip>
            )}
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

const UserPage = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [showDialogDeleteUser, setShowDialogDeleteUser] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 })
  const [selectedOrganizationUser, setSelectedOrganizationUser] = useState<OrganizationUserResponseDto | null>(null)
  const [isSelectAdmin, setIsSelectAdmin] = useState(false)

  // ** Hooks
  const { t } = useTranslation()
  const { organizationId } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const userStore = useSelector((state: RootState) => state.user)
  const roleStore = useSelector((state: RootState) => state.role)

  useEffect(() => {
    dispatch(
      fetchUser({
        organizationId,
        role,
        query: value
      })
    )
    dispatch(fetchAdminCount(organizationId))
    dispatch(fetchRole({ organizationId, query: '' }))
  }, [dispatch, role, value, organizationId])

  const totalUserItem: UserCardStatsHorizontalProps = {
    stats: userStore.totalUsers.toString(),
    title: 'user_page.total_users',
    icon: 'mdi:account-outline'
  }

  const totalRoleItem: UserCardStatsHorizontalProps = {
    stats: roleStore.totalRoles.toString(),
    title: 'user_page.total_roles',
    icon: 'mdi:shield-outline',
    color: 'success'
  }

  const hasOnlyOneAdmin = (): boolean => {
    return userStore.totalAdmins <= 1
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

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser({ organizationId, userId }))

    setShowDialogDeleteUser(false)
    setSelectedOrganizationUser(null)
  }

  const toggleAddUserDrawer = () => {
    setAddUserOpen(!addUserOpen)
    setIsSelectAdmin(false)
  }

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 200,
      field: 'name',
      headerName: `${t('user_page.user')}`,
      renderCell: ({ row }: CellType) => {
        const { name, email } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href='/apps/user/view/overview/'>{name}</LinkStyled>
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
      headerName: `${t('user_page.email')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.email || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'role',
      minWidth: 125,
      headerName: `${t('user_page.role')}`,
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
      flex: 0.1,
      minWidth: 125,
      field: 'phone',
      headerName: `${t('user_page.phone')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.phone || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 200,
      field: 'address',
      headerName: `${t('user_page.address')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
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
      headerName: `${t('user_page.actions')}`,
      renderCell: ({ row }: CellType) => (
        <RowOptions
          row={row}
          isUserLastAdmin={isUserLastAdmin}
          setShowDialogDeleteUser={setShowDialogDeleteUser}
          setSelectedOrganizationUser={setSelectedOrganizationUser}
        />
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} sm={6}>
            <UserCardStatsHorizontal {...totalUserItem} icon={<Icon icon={totalUserItem.icon as string} />} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <UserCardStatsHorizontal {...totalRoleItem} icon={<Icon icon={totalRoleItem.icon as string} />} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t('user_page.search_filters')} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>{t('user_page.select_role')}</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label={t('user_page.select_role')}
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: `${t('user_page.select_role')}` }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value=''>{t('user_page.select_role')}</MenuItem>
                    {roleStore.roles.map(role => (
                      <MenuItem value={role.slug} key={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader users={userStore.users} value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={userStore.users}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[25, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        allRoles={roleStore.roles}
        isSelectAdmin={isSelectAdmin}
        setIsSelectAdmin={setIsSelectAdmin}
      />
      <DialogDeleteUser
        show={showDialogDeleteUser}
        setShow={setShowDialogDeleteUser}
        userId={selectedOrganizationUser?.id || 0}
        handleDelete={handleDeleteUser}
        setSelectedOrganizationUser={setSelectedOrganizationUser}
      />
    </Grid>
  )
}

UserPage.acl = {
  action: 'read',
  subject: 'user'
}

export default UserPage
