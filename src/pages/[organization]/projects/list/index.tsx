// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** React Import
import { forwardRef, useContext, useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'

// ** Type Imports
import { CurrencyType, OrganizationUserResponseDto, ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Enums Imports
import { Locale } from 'src/enum'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getProjectDefaultTab, getProjectEditUrl } from 'src/utils/router'
import { formatCurrencyAsCompact } from 'src/utils/currency'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { deleteProject, fetchProject } from 'src/store/apps/project'

// ** Third Party Imports
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { ThemeColor } from 'src/@core/layouts/types'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormControl from '@mui/material/FormControl'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: ProjectResponseDto
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** renders client column
const renderClient = (row: OrganizationUserResponseDto) => {
  console.log(row)
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

const Projects = () => {
  const { organizationId } = useCurrentOrganization()
  const { t } = useTranslation()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const store = useSelector((state: RootState) => state.project)
  const ability = useContext(AbilityContext)

  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  useEffect(() => {
    // Fetch organization's projects
    dispatch(
      fetchProject({ organizationId, query: searchValue, fromDate: dates[0]?.toString(), toDate: dates[1]?.toString() })
    )
  }, [dispatch, searchValue, dates, organizationId])

  const handleFilterByName = (name: string) => {
    setSearchValue(name)
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 50,
      headerName: '#',
      renderCell: ({ row }: CellType) => <LinkStyled href={getProjectDefaultTab(row.id)}>{`#${row.id}`}</LinkStyled>
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'name',
      headerName: `${t('project_page.list.name')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.name || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      field: 'creator',
      minWidth: 200,
      headerName: t('project_page.list.creator') as string,
      renderCell: ({ row }: CellType) => {
        const { creator } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(creator)}
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
      field: 'client',
      minWidth: 200,
      headerName: t('project_page.list.client') as string,
      renderCell: ({ row }: CellType) => {
        const { creator } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(creator)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                Jeffrey Phillips
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'totalBudget',
      headerName: t('project_page.list.total_budget') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex' }}>
          {/* TODO: Calculate item.budgetSpent */}
          <Typography sx={{ color: 'text.secondary' }}>$18.2k/</Typography>
          <Typography sx={{ fontWeight: 600 }}>{`${formatCurrencyAsCompact(
            row.totalBudget,
            Locale.EN,
            CurrencyType.USD
          )}`}</Typography>
        </Box>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'description',
      headerName: `${t('project_page.list.description')}`,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.description || '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'startDate',
      headerName: t('project_page.list.start_date') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{format(new Date(row.startDate), 'dd MMM yyyy')}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'endDate',
      headerName: t('project_page.list.end_date') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{format(new Date(row.endDate), 'dd MMM yyyy')}</Typography>
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
      headerName: t('project_page.list.actions') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('project_page.list.delete_project')}>
            <IconButton
              size='small'
              color='error'
              onClick={() => dispatch(deleteProject({ organizationId, projectId: row.id }))}
              disabled={!ability?.can('delete', 'project')}
            >
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('invoice_page.list.view')}>
            <IconButton size='small' component={Link} href={getProjectDefaultTab(row.id)}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('project_page.list.edit_project')}>
            <IconButton
              size='small'
              color='info'
              onClick={() => router.replace(getProjectEditUrl(row.id))}
              disabled={!ability?.can('update', 'project')}
            >
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t('project_page.list.filters')} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
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
                        label={t('project_page.list.project_start_date')}
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      value={searchValue}
                      sx={{ mr: 4, mb: 2 }}
                      placeholder={t('project_page.list.search_project_name') as string}
                      onChange={e => handleFilterByName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rows={store.data}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

Projects.acl = {
  action: 'read',
  subject: 'project'
}

export default Projects
