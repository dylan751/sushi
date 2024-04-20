// ** React Imports
import { useState, useEffect, useCallback, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { deleteCategory, fetchCategory } from 'src/store/apps/category'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CategoryResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/project/category/list/TableHeader'
import AddCategoryDrawer from 'src/views/apps/project/category/list/AddCategoryDrawer'

// ** Hooks
import { useTranslation } from 'react-i18next'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

// ** Util Imports
import format from 'date-fns/format'
import { capitalizeFirstLetter } from 'src/utils/string'

interface CellType {
  row: CategoryResponseDto
}

export interface CategoryTabProps {
  projectId: string
}

const CategoryTab = ({ projectId }: CategoryTabProps) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { t } = useTranslation()
  const { organizationId } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const categoryStore = useSelector((state: RootState) => state.category)
  const ability = useContext(AbilityContext)

  useEffect(() => {
    dispatch(
      fetchCategory({
        organizationId,
        projectId: parseInt(projectId),
        query: value

        // type
      })
    )
  }, [dispatch, value, organizationId, projectId])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleDeleteCategory = (categoryId: number) => {
    dispatch(deleteCategory({ organizationId, projectId: parseInt(projectId), categoryId }))
  }

  const toggleAddCategoryDrawer = () => {
    setAddCategoryOpen(!addCategoryOpen)
  }

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.35,
      field: 'name',
      minWidth: 280,
      headerName: t('project_page.category.name') as string,
      renderCell: ({ row }: CellType) => (
        <CustomChip size='small' skin='light' color={row.color as any} label={row.name} />
      )
    },
    {
      flex: 0.15,
      minWidth: 215,
      field: 'icon',
      headerName: t('project_page.category.icon') as string,

      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: `${row.color}.main` } }}>
          <Icon icon={row.icon} fontSize={20} />
        </Box>
      )
    },
    {
      flex: 0.25,
      minWidth: 215,
      field: 'createdDate',
      headerName: t('project_page.category.created_date') as string,
      renderCell: ({ row }: CellType) => <Typography>{format(new Date(row.createdAt), 'dd MMM yyyy')}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 215,
      field: 'type',
      headerName: t('project_page.category.type') as string,
      renderCell: ({ row }: CellType) => <Typography>{capitalizeFirstLetter(row.type)}</Typography>
    }
  ]

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: t('project_page.category.actions') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <IconButton color='info' onClick={() => handleEditCategory(row.id)}> */}
          {ability?.can('update', 'category') && (
            <IconButton color='info'>
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          )}
          {ability?.can('delete', 'category') && (
            <IconButton color='error' onClick={() => handleDeleteCategory(row.id)}>
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          )}
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddCategoryDrawer} />
          <DataGrid
            autoHeight
            rows={categoryStore.categories}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} projectId={projectId} />
    </Grid>
  )
}

CategoryTab.acl = {
  action: 'read',
  subject: 'category'
}

export default CategoryTab
