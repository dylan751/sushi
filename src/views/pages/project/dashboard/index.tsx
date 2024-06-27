// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchStatistics } from 'src/store/apps/organization/project/statistics'
import { fetchInvoiceForProject } from 'src/store/apps/organization/invoice'

// ** Types Import
import { AppDispatch, RootState } from 'src/store'
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'
import { Locale } from 'src/enum'
import { CurrencyType, InvoiceType } from 'src/__generated__/AccountifyAPI'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components Imports
import ProjectTransactions from 'src/views/dashboards/projects/ProjectTransactions'
import ProjectApexLineChart from 'src/views/dashboards/projects/ProjectApexLineChart'
import ProjectApexDonutChart from 'src/views/dashboards/projects/ProjectApexDonutChart'
import ProjectTotalCard from 'src/views/dashboards/projects/ProjectTotalCard'
import ProjectLastInvoices from 'src/views/dashboards/projects/ProjectLastInvoices'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'

// ** Utils Imports
import { formatCurrencyAsCompact } from 'src/utils/currency'
import { endOfYear, format, startOfYear } from 'date-fns'

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
  projectId: number
}

const DashboardTab = ({ projectId }: DashboardTabProps) => {
  // ** State
  const [year, setYear] = useState<Date>(new Date())

  // ** Hooks
  const { organizationId } = useCurrentOrganization()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const statisticsStore = useSelector((state: RootState) => state.projectStatistics)
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  useEffect(() => {
    dispatch(fetchStatistics({ organizationId, projectId, date: year ? year.toString() : '' }))
    dispatch(
      fetchInvoiceForProject({
        organizationId,
        projectId,
        status: 'uncategorized',
        fromDate: startOfYear(year ?? new Date())?.toString(),
        toDate: endOfYear(year ?? new Date())?.toString()
      })
    )
  }, [dispatch, year, organizationId, projectId])

  const data: CardStatsCharacterProps[] = [
    {
      // trendNumber: '+38%',
      stats: formatCurrencyAsCompact(statisticsStore.statistics.totalIncome ?? 0, Locale.EN, CurrencyType.USD),
      title: t('project_page.dashboard.income'),
      chipColor: 'success',
      chipText: `${t('dashboard_page.year_of')} ${format(year ?? new Date(), 'yyyy')}`,
      src: '/images/cards/pose_f9.png'
    },
    {
      // trend: 'negative',
      // trendNumber: '-22%',
      stats: formatCurrencyAsCompact(statisticsStore.statistics.totalExpense ?? 0, Locale.EN, CurrencyType.USD),
      title: t('project_page.dashboard.expense'),
      chipText: `${t('dashboard_page.year_of')} ${format(year ?? new Date(), 'yyyy')}`,
      chipColor: 'error',
      src: '/images/cards/pose_m18.png'
    }
  ]

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} sx={{ paddingTop: '30px' }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid item xs={12}>
                  <DatePicker
                    showYearPicker
                    selected={year}
                    id='year-picker'
                    dateFormat='yyyy'
                    onChange={(date: Date) => setYear(date)}
                    customInput={<CustomInput label={t('project_page.dashboard.year_picker') as string} />}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
            <CardStatisticsCharacter data={data[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
            <CardStatisticsCharacter data={data[1]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectTransactions data={statisticsStore.statistics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectApexLineChart data={statisticsStore.statistics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectApexDonutChart data={statisticsStore.statistics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectTotalCard
              title={t('project_page.dashboard.total_uncategorized_incomes')}
              type={InvoiceType.INCOME}
              invoices={invoiceStore.projectInvoices}
              total={statisticsStore.statistics.totalUncategorizedIncome}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectTotalCard
              title={t('project_page.dashboard.total_uncategorized_expenses')}
              type={InvoiceType.EXPENSE}
              invoices={invoiceStore.projectInvoices}
              total={statisticsStore.statistics.totalUncategorizedExpense}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <ProjectLastInvoices data={statisticsStore.statistics} />
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
