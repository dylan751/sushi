// ** React Imports
import { useState, useEffect, useCallback, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { deleteCategory, fetchCategory } from 'src/store/apps/organization/project/category'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CategoryResponseDto, InvoiceType } from 'src/__generated__/AccountifyAPI'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/project/category/list/TableHeader'
import AddCategoryDrawer from 'src/views/apps/project/category/list/AddCategoryDrawer'
import UpdateCategoryDrawer from 'src/views/apps/project/category/list/UpdateCategoryDrawer'

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

const CategoryListTable = ({ projectId }: CategoryTabProps) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<InvoiceType | ''>('')
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false)
  const [updateCategoryOpen, setUpdateCategoryOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponseDto | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 })

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
        query: value,
        type: type
      })
    )
  }, [dispatch, value, type, organizationId, projectId])

  const handleFilterByName = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleFilterByType = useCallback((val: InvoiceType | '') => {
    setType(val)
  }, [])

  const handleDeleteCategory = (categoryId: number) => {
    dispatch(deleteCategory({ organizationId, projectId: parseInt(projectId), categoryId }))
  }

  const toggleAddCategoryDrawer = () => {
    setAddCategoryOpen(!addCategoryOpen)
  }

  const toggleUpdateCategoryDrawer = (categoryId: number | null) => {
    if (categoryId) {
      const category = categoryStore.categories.find(category => category.id === categoryId) ?? null
      setSelectedCategory(category)
    } else {
      setSelectedCategory(null)
    }

    setUpdateCategoryOpen(!updateCategoryOpen)
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
      renderCell: ({ row }: CellType) => (
        <CustomChip
          size='small'
          skin='light'
          color={row.type === InvoiceType.EXPENSE ? 'error' : 'success'}
          label={capitalizeFirstLetter(row.type)}
        />
      )
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
          <Tooltip title={t('project_page.category.update_category')}>
            <span>
              <IconButton
                color='info'
                onClick={() => toggleUpdateCategoryDrawer(row.id)}
                disabled={!ability?.can('update', 'category')}
              >
                <Icon icon='mdi:pencil-outline' fontSize={20} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('project_page.category.delete_category')}>
            <span>
              <IconButton
                color='error'
                onClick={() => handleDeleteCategory(row.id)}
                disabled={!ability?.can('delete', 'category')}
              >
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t('project_page.category.filters')} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    value={value}
                    sx={{ mb: 2 }}
                    placeholder={t('project_page.category.search_category') as string}
                    onChange={e => handleFilterByName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='category-type-select'>{t('project_page.category.category_type')}</InputLabel>

                  <Select
                    fullWidth
                    value={type}
                    sx={{ mr: 4, mb: 2 }}
                    label='Category Type'
                    onChange={e => handleFilterByType(e.target.value as InvoiceType)}
                    labelId='category-type-select'
                  >
                    <MenuItem value=''>All Types</MenuItem>
                    <MenuItem value={InvoiceType.EXPENSE}>
                      <CustomChip size='small' skin='light' color='error' label='Expense' />
                    </MenuItem>
                    <MenuItem value={InvoiceType.INCOME}>
                      <CustomChip size='small' skin='light' color='success' label='Income' />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader toggle={toggleAddCategoryDrawer} />

          <DataGrid
            autoHeight
            rows={categoryStore.categories}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[25, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} projectId={projectId} />
      <UpdateCategoryDrawer
        open={updateCategoryOpen}
        toggle={toggleUpdateCategoryDrawer}
        projectId={projectId}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Grid>
  )
}

export default CategoryListTable
