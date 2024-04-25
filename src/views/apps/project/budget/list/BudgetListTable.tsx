// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Hook Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { deleteBudget, fetchBudget } from 'src/store/apps/budget'
import { fetchCategory } from 'src/store/apps/category'

// ** Type Imports
import { BudgetResponseDto, CurrencyType, InvoiceType } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Utils Imports
import { formatCurrencyAsCompact } from 'src/utils/currency'
import { calculateBudgetProcess, renderColorBudgetProcess } from 'src/utils/budget'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import TableHeader from './TableHeader'
import AddBudgetDrawer from './AddBudgetDrawer'
import UpdateBudgetDrawer from './UpdateBudgetDrawer'

interface CellType {
  row: BudgetResponseDto
}

export interface BudgetListTableProps {
  projectId: string
}

const BudgetListTable = ({ projectId }: BudgetListTableProps) => {
  // ** State
  const [categoryId, setCategoryId] = useState<string | ''>('')
  const [addBudgetOpen, setAddBudgetOpen] = useState<boolean>(false)
  const [updateBudgetOpen, setUpdateBudgetOpen] = useState<boolean>(false)
  const [selectedBudget, setSelectedBudget] = useState<BudgetResponseDto | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  // ** Hooks
  const { organizationId } = useCurrentOrganization()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const budgetStore = useSelector((state: RootState) => state.budget)
  const categoryStore = useSelector((state: RootState) => state.category)
  const ability = useContext(AbilityContext)

  const handleOnChangeCategory = (value: string | '') => {
    setCategoryId(value)
  }

  const handleDeleteBudget = (budgetId: number) => {
    dispatch(deleteBudget({ organizationId, projectId: parseInt(projectId), budgetId }))
  }

  const toggleAddBudgetDrawer = () => {
    setAddBudgetOpen(!addBudgetOpen)
  }

  const toggleUpdateBudgetDrawer = (budgetId: number | null) => {
    if (budgetId) {
      const budget = budgetStore.budgets.find(budget => budget.id === budgetId) ?? null
      setSelectedBudget(budget)
    } else {
      setSelectedBudget(null)
    }

    setUpdateBudgetOpen(!updateBudgetOpen)
  }

  useEffect(() => {
    const fetchBudgetParams: any = {
      organizationId,
      projectId: parseInt(projectId)
    }
    if (categoryId) {
      fetchBudgetParams.categoryId = parseInt(categoryId)
    }
    dispatch(fetchBudget(fetchBudgetParams))
  }, [dispatch, organizationId, projectId, categoryId])

  useEffect(() => {
    dispatch(fetchCategory({ organizationId, projectId: parseInt(projectId) }))
  }, [dispatch, organizationId, projectId])

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 150,
      field: 'category',
      headerName: t('project_page.budget.category') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color={row.category.color} sx={{ marginRight: '4px' }}>
            <Icon icon={row.category.icon} fontSize={20} color={row.category.color} />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: `${row.category.color}.main` }}>
              {row.category.name}
            </Typography>
            <Typography variant='caption'>
              {
                <CustomChip
                  size='small'
                  skin='light'
                  color={row.category.type === InvoiceType.EXPENSE ? 'error' : 'success'}
                  label={row.category.type}
                />
              }
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.4,
      minWidth: 240,
      field: 'progressValue',
      headerName: t('project_page.budget.progress') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ width: '100%' }}>
          <Typography variant='body2' sx={{ color: `text.${row.category.color}` }}>
            {calculateBudgetProcess(row.category.totalSpent, row.amount)}%
          </Typography>
          <LinearProgress
            variant='determinate'
            value={calculateBudgetProcess(row.category.totalSpent, row.amount)}
            color={renderColorBudgetProcess(row.category.totalSpent, row.amount) as any}
            sx={{ height: 6, borderRadius: '5px' }}
          />
        </Box>
      )
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'amount',
      headerName: t('project_page.budget.amount') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatCurrencyAsCompact(row.amount, Locale.EN, CurrencyType.USD)}
        </Typography>
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
      headerName: t('project_page.budget.actions') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('update', 'budget') && (
            <IconButton color='info' onClick={() => toggleUpdateBudgetDrawer(row.id)}>
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          )}
          {ability?.can('delete', 'budget') && (
            <IconButton color='error' onClick={() => handleDeleteBudget(row.id)}>
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
          <CardHeader title={t('project_page.budget.filters')} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='category-type-select'>{t('project_page.budget.category_type')}</InputLabel>

                  <Select
                    fullWidth
                    value={categoryId}
                    sx={{ mr: 4, mb: 2 }}
                    label='Category Type'
                    onChange={e => handleOnChangeCategory(e.target.value)}
                    labelId='category-type-select'
                  >
                    <MenuItem value=''>All Categories</MenuItem>
                    {categoryStore.categories.map(
                      category =>
                        category.type === InvoiceType.EXPENSE && (
                          <MenuItem value={category.id} key={category.id}>
                            {category.name}
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader toggle={toggleAddBudgetDrawer} />
          <DataGrid
            autoHeight
            rows={budgetStore.budgets}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[7, 10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <AddBudgetDrawer
        open={addBudgetOpen}
        toggle={toggleAddBudgetDrawer}
        projectId={projectId}
        categories={categoryStore.categories}
      />
      <UpdateBudgetDrawer
        open={updateBudgetOpen}
        toggle={toggleUpdateBudgetDrawer}
        projectId={projectId}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
      />
    </Grid>
  )
}

export default BudgetListTable
