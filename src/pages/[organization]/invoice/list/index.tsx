// ** React Imports
import { useState, useEffect, forwardRef, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvoice, deleteInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getInvoiceEditUrl, getInvoicePreviewUrl } from 'src/utils/router/invoice'
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { getProjectInvoiceTab } from 'src/utils/router'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Type Imports
import { InvoiceResponseDto, InvoiceType, OrganizationUserResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Enums Imports
import { Locale } from 'src/enum'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { fetchProject } from 'src/store/apps/project'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: InvoiceResponseDto
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** renders creator column
const renderCreator = (row: OrganizationUserResponseDto) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={'primary' as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

// ** renders client column
const renderClient = (row: string) => {
  return (
    <CustomAvatar
      skin='light'
      color={'primary' as ThemeColor}
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row || 'John Doe')}
    </CustomAvatar>
  )
}

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const InvoiceList = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [type, setType] = useState<InvoiceType | ''>('')
  const [projectId, setProjectId] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { organizationId } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)
  const projectStore = useSelector((state: RootState) => state.project)
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchInvoiceParams: any = {
      organizationId,
      fromDate: dates[0]?.toString(),
      toDate: dates[1]?.toString(),
      type
    }
    if (projectId) {
      fetchInvoiceParams.projectId = parseInt(projectId)
    }
    dispatch(fetchInvoice(fetchInvoiceParams))
  }, [dispatch, dates, type, projectId, organizationId])

  useEffect(() => {
    dispatch(fetchProject({ organizationId }))
  }, [dispatch, organizationId])

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const handleOnChangeType = (value: InvoiceType | '') => {
    setType(value)
  }

  const handleOnChangeProjectId = (value: string) => {
    setProjectId(value)
  }

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 50,
      headerName: '#',
      renderCell: ({ row }: CellType) => <LinkStyled href={getInvoicePreviewUrl(row.id)}>{`#${row.id}`}</LinkStyled>
    },
    {
      flex: 0.2,
      field: 'creator',
      minWidth: 150,
      headerName: t('invoice_page.list.creator') as string,
      renderCell: ({ row }: CellType) => {
        const { creator } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderCreator(creator)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {creator.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'clientName',
      minWidth: 150,
      headerName: t('invoice_page.list.client') as string,
      renderCell: ({ row }: CellType) => {
        const { clientName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(clientName)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {clientName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 125,
      field: 'total',
      headerName: t('invoice_page.list.total') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ color: row.type === InvoiceType.EXPENSE ? 'error.main' : 'success.main' }}>
          {row.type === InvoiceType.EXPENSE ? '-' : '+'}
          {formatCurrencyAsStandard(row.total, Locale.EN, row.currency)}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 125,
      field: 'date',
      headerName: t('invoice_page.list.date') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'project',
      headerName: t('invoice_page.list.project') as string,
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={getProjectInvoiceTab(row.project.id)}>{`${row.project.name}`}</LinkStyled>
      )
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'category',
      headerName: t('invoice_page.list.category') as string,
      renderCell: ({ row }: CellType) => (
        <CustomChip label={row.category.name} skin='light' color={row.category.color as any} />
      )
    }
  ]

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: t('invoice_page.list.actions') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('invoice_page.list.delete_invoice')}>
            <span>
              <IconButton
                size='small'
                color='error'
                onClick={() => dispatch(deleteInvoice({ organizationId, invoiceId: row.id }))}
                disabled={!ability?.can('delete', 'invoice')}
              >
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('invoice_page.list.view')}>
            <span>
              <IconButton size='small' component={Link} href={getInvoicePreviewUrl(row.id)}>
                <Icon icon='mdi:eye-outline' fontSize={20} />
              </IconButton>
            </span>
          </Tooltip>
          {ability?.can('update', 'invoice') && (
            <OptionsMenu
              iconProps={{ fontSize: 20 }}
              iconButtonProps={{ size: 'small' }}
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              options={[
                {
                  text: t('invoice_page.list.download'),
                  icon: <Icon icon='mdi:download' fontSize={20} />
                },
                {
                  text: t('invoice_page.list.edit'),
                  href: getInvoiceEditUrl(row.id),
                  icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
                },
                {
                  text: t('invoice_page.list.duplicate'),
                  icon: <Icon icon='mdi:content-copy' fontSize={20} />
                }
              ]}
            />
          )}
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t('invoice_page.list.filters')} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label={t('invoice_page.list.invoice_date')}
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-type-select'>{t('invoice_page.list.invoice_type')}</InputLabel>
                    <Select
                      fullWidth
                      value={type}
                      sx={{ mr: 4, mb: 2 }}
                      label='Invoice Type'
                      onChange={e => handleOnChangeType(e.target.value as InvoiceType | '')}
                      labelId='invoice-type-select'
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
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-project-select'>{t('invoice_page.list.project')}</InputLabel>

                    <Select
                      fullWidth
                      value={projectId}
                      sx={{ mr: 4, mb: 2 }}
                      label='Invoice Project'
                      onChange={e => handleOnChangeProjectId(e.target.value)}
                      labelId='invoice-project-select'
                    >
                      <MenuItem value=''>All Projects</MenuItem>
                      {projectStore.projects.map(project => (
                        <MenuItem value={project.id} key={project.id}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader selectedRows={selectedRows} />
            <DataGrid
              autoHeight
              pagination
              rows={invoiceStore.invoices}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={rows => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

InvoiceList.acl = {
  action: 'read',
  subject: 'invoice'
}

export default InvoiceList
