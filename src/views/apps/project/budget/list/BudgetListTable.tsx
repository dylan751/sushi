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
import Tooltip from '@mui/material/Tooltip'

// ** Hook Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { deleteBudget, fetchBudget } from 'src/store/apps/organization/project/budget'
import { fetchCategory } from 'src/store/apps/organization/project/category'

// ** Type Imports
import { BudgetResponseDto, InvoiceType } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Utils Imports
import { convertCurrencyValue, formatCurrencyAsCompact } from 'src/utils/currency'
import { calculateBudgetProcess, renderColorBudgetProcess } from 'src/utils/budget'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import TableHeader from './TableHeader'
import AddBudgetDrawer from './AddBudgetDrawer'
import UpdateBudgetDrawer from './UpdateBudgetDrawer'

// ** Constant Imports
import { MenuProps } from 'src/constants'
import { capitalizeFirstLetter } from 'src/utils/string'

interface CellType {
  row: BudgetResponseDto
}

export interface BudgetListTableProps {
  projectId: number
}

const BudgetListTable = ({ projectId }: BudgetListTableProps) => {
  // ** State
  const [categoryId, setCategoryId] = useState<string | ''>('')
  const [addBudgetOpen, setAddBudgetOpen] = useState<boolean>(false)
  const [updateBudgetOpen, setUpdateBudgetOpen] = useState<boolean>(false)
  const [selectedBudget, setSelectedBudget] = useState<BudgetResponseDto | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 })

  // ** Hooks
  const { organizationId, organization } = useCurrentOrganization()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const budgetStore = useSelector((state: RootState) => state.budget)
  const categoryStore = useSelector((state: RootState) => state.category)
  const ability = useContext(AbilityContext)

  const handleOnChangeCategory = (value: string | '') => {
    setCategoryId(value)
  }

  const handleDeleteBudget = (budgetId: number) => {
    dispatch(deleteBudget({ organizationId, projectId, budgetId }))
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
      projectId
    }
    if (categoryId) {
      fetchBudgetParams.categoryId = parseInt(categoryId)
    }
    dispatch(fetchBudget(fetchBudgetParams))
  }, [dispatch, organizationId, projectId, categoryId])

  useEffect(() => {
    if (ability?.can('read', 'category')) {
      dispatch(fetchCategory({ organizationId, projectId }))
    }
  }, [dispatch, organizationId, projectId, ability])

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.3,
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
          <Typography variant='body2'>{calculateBudgetProcess(row.category.totalSpent, row.amount)}%</Typography>
          <LinearProgress
            variant='determinate'
            value={
              calculateBudgetProcess(row.category.totalSpent, row.amount) <= 100
                ? calculateBudgetProcess(row.category.totalSpent, row.amount)
                : 100
            }
            color={renderColorBudgetProcess(row.category.totalSpent, row.amount) as any}
            sx={{ height: 6, borderRadius: '5px' }}
          />
        </Box>
      )
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'amount',
      headerName: t('project_page.budget.amount') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatCurrencyAsCompact(
            convertCurrencyValue(row.amount, organization?.currency, organization?.exchangeRate),
            Locale.EN,
            organization?.currency
          )}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'type',
      headerName: t('project_page.category.type') as string,
      renderCell: ({ row }: CellType) => (
        <CustomChip
          size='small'
          skin='light'
          color={row.category.type === InvoiceType.EXPENSE ? 'error' : 'success'}
          label={capitalizeFirstLetter(row.category.type)}
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
      headerName: t('project_page.budget.actions') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('project_page.budget.update_budget')}>
            <span>
              <IconButton
                color='info'
                onClick={() => toggleUpdateBudgetDrawer(row.id)}
                disabled={!ability?.can('update', 'budget')}
              >
                <Icon icon='mdi:pencil-outline' fontSize={20} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('project_page.budget.delete_budget')}>
            <span>
              <IconButton
                color='error'
                onClick={() => handleDeleteBudget(row.id)}
                disabled={!ability?.can('delete', 'budget')}
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
                    MenuProps={MenuProps}
                  >
                    <MenuItem value=''>All Categories</MenuItem>
                    {categoryStore.categories.map(
                      category =>
                        category.type === InvoiceType.EXPENSE && (
                          <MenuItem value={category.id} key={category.id}>
                            <CustomChip size='small' skin='light' color={category.color as any} label={category.name} />
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
            pageSizeOptions={[25, 50, 100]}
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
