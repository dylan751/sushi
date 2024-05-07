// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Import
import { AppDispatch, RootState } from 'src/store'
import { fetchStatistics } from 'src/store/apps/project/statistics'
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { Locale } from 'src/enum'
import { CurrencyType } from 'src/__generated__/AccountifyAPI'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components Imports
import ProjectTransactions from 'src/views/dashboards/projects/ProjectTransactions'
import ProjectApexLineChart from 'src/views/dashboards/projects/ProjectApexLineChart'
import ProjectApexDonutChart from 'src/views/dashboards/projects/ProjectApexDonutChart'
import ProjectLastInvoices from 'src/views/dashboards/projects/ProjectLastInvoices'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'

// ** Utils Imports
import { formatCurrencyAsCompact } from 'src/utils/currency'
import { format } from 'date-fns'

interface CustomInputProps {
  label?: string
  readOnly?: boolean
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})

export interface DashboardTabProps {
  projectId: string
}

const DashboardTab = ({ projectId }: DashboardTabProps) => {
  // ** State
  const [year, setYear] = useState<DateType>(new Date())

  // ** Hooks
  const { organizationId } = useCurrentOrganization()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.statistics)

  useEffect(() => {
    // Fetch organization's project's statistics
    dispatch(fetchStatistics({ organizationId, projectId: parseInt(projectId), date: year ? year.toString() : '' }))
  }, [dispatch, year, organizationId, projectId])

  const data: CardStatsCharacterProps[] = [
    {
      // trendNumber: '+38%',
      stats: formatCurrencyAsCompact(store.statistics.totalIncome ?? 0, Locale.EN, CurrencyType.USD),
      title: t('project_page.dashboard.income'),
      chipColor: 'success',
      chipText: `Year of ${format(year!, 'yyyy')}`,
      src: '/images/cards/pose_f9.png'
    },
    {
      // trend: 'negative',
      // trendNumber: '-22%',
      stats: formatCurrencyAsCompact(store.statistics.totalExpense ?? 0, Locale.EN, CurrencyType.USD),
      title: t('project_page.dashboard.expense'),
      chipText: `Year of ${format(year!, 'yyyy')}`,
      chipColor: 'error',
      src: '/images/cards/pose_m18.png'
    }
  ]

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <DatePicker
          showYearPicker
          selected={year}
          id='year-picker'
          dateFormat='yyyy'
          onChange={(date: Date) => setYear(date)}
          customInput={<CustomInput label={t('project_page.dashboard.year_picker') as string} />}
        />
        <Grid container spacing={6} sx={{ paddingTop: '30px' }}>
          <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
            <CardStatisticsCharacter data={data[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
            <CardStatisticsCharacter data={data[1]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectTransactions data={store.statistics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectApexLineChart data={store.statistics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectApexDonutChart data={store.statistics} />
          </Grid>
          <Grid item xs={12} md={12}>
            <ProjectLastInvoices data={store.statistics} />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

DashboardTab.acl = {
  action: 'read',
  subject: 'project'
}

export default DashboardTab
