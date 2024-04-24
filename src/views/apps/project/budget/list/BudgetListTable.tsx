// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Hook Imports
import { useCurrentOrganization } from 'src/hooks'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchBudget } from 'src/store/apps/budget'

// ** Type Imports
import { BudgetResponseDto, CurrencyType, InvoiceType } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Utils Imports
import { formatCurrencyAsCompact } from 'src/utils/currency'
import { calculateBudgetProcess } from 'src/utils/budget'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

interface CellType {
  row: BudgetResponseDto
}
const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 150,
    field: 'category',
    headerName: 'Category',
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
    headerName: 'Progress',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ width: '100%' }}>
        <Typography variant='body2' sx={{ color: `text.${row.category.color}` }}>
          {calculateBudgetProcess(row.category.spentAmount, row.amount)}%
        </Typography>
        <LinearProgress
          variant='determinate'
          value={calculateBudgetProcess(row.category.spentAmount, row.amount)}
          color={row.category.color} // TODO: Use `success`, `warning`, `error` color based on budget state
          sx={{ height: 6, borderRadius: '5px' }}
        />
      </Box>
    )
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: 'amount',
    headerName: 'amount',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {formatCurrencyAsCompact(row.amount, Locale.EN, CurrencyType.USD)}
      </Typography>
    )
  }
]

export interface BudgetListTableProps {
  projectId: string
}

const BudgetListTable = ({ projectId }: BudgetListTableProps) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  // ** Hooks
  const { organizationId } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const budgetStore = useSelector((state: RootState) => state.budget)

  useEffect(() => {
    dispatch(fetchBudget({ organizationId, projectId: parseInt(projectId) }))
  }, [dispatch, organizationId, projectId, value])

  return (
    <Card>
      <CardHeader title='Budget List' />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography variant='body2' sx={{ mr: 2 }}>
            Search:
          </Typography>
          <TextField size='small' placeholder='Search Project' value={value} onChange={e => setValue(e.target.value)} />
        </Box>
      </CardContent>
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
  )
}

export default BudgetListTable
