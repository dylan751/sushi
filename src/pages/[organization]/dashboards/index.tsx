// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import OrganizationTotalProfit from 'src/views/dashboards/analytics/OrganizationTotalProfit'
import OrganizationBudgetOverview from 'src/views/dashboards/analytics/OrganizationBudgetOverview'
import OrganizationTotalCard from 'src/views/dashboards/analytics/OrganizationTotalCard'
import OrganizationBudgetTracking from 'src/views/dashboards/analytics/OrganizationBudgetTracking'
import OrganizationCongratulations from 'src/views/dashboards/analytics/OrganizationCongratulations'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchStatistics } from 'src/store/apps/organization/statistics'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'

// ** Types Imports
import { Locale } from 'src/enum'
import { CurrencyType, InvoiceType } from 'src/__generated__/AccountifyAPI'

// ** Utils Imports
import { endOfYear, format, startOfYear } from 'date-fns'
import { formatCurrencyAsCompact } from 'src/utils/currency'
import { fetchInvoice } from 'src/store/apps/organization/invoice'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

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

const Dashboard = () => {
  // ** State
  const [year, setYear] = useState<Date>(new Date())

  // ** Hooks
  const { organizationId } = useCurrentOrganization()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const statisticsStore = useSelector((state: RootState) => state.organizationStatistics)
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  useEffect(() => {
    dispatch(fetchStatistics({ organizationId, date: year ? year.toString() : '' }))
    dispatch(
      fetchInvoice({
        organizationId,
        status: 'uncategorized',
        fromDate: startOfYear(year ?? new Date())?.toString(),
        toDate: endOfYear(year ?? new Date())?.toString()
      })
    )
  }, [dispatch, year, organizationId])

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6}>
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
          <Grid item xs={12} md={8} sx={{ order: 0, alignSelf: 'flex-end' }}>
            <OrganizationCongratulations />
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ order: 0 }}>
            <CardStatisticsVerticalComponent
              stats={formatCurrencyAsCompact(statisticsStore.statistics.totalIncome ?? 0, Locale.EN, CurrencyType.USD)}
              color='success'
              trendNumber={t('dashboard_page.good') as string}
              title={t('dashboard_page.income')}
              subtitle={`${t('dashboard_page.year_of')} ${format(year ?? new Date(), 'yyyy')}`}
              icon={<Icon icon='mdi:trending-up' />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ order: 0 }}>
            <CardStatisticsVerticalComponent
              stats={formatCurrencyAsCompact(statisticsStore.statistics.totalExpense ?? 0, Locale.EN, CurrencyType.USD)}
              color='error'
              title={t('dashboard_page.expense')}
              trendNumber={t('dashboard_page.good') as string}
              subtitle={`${t('dashboard_page.year_of')} ${format(year ?? new Date(), 'yyyy')}`}
              icon={<Icon icon='mdi:currency-usd' />}
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ order: 0 }}>
            <OrganizationTotalProfit data={statisticsStore.statistics} />
          </Grid>
          <Grid item xs={12} md={8}>
            <OrganizationBudgetOverview data={statisticsStore.statistics} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ order: 0 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <CardStatisticsVerticalComponent
                  stats={statisticsStore.statistics.projectCount?.toString()}
                  color='success'
                  title={t('dashboard_page.projects')}
                  subtitle={`${t('dashboard_page.year_of')} ${format(year ?? new Date(), 'yyyy')}`}
                  icon={<Icon icon='mdi:cube-outline' />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardStatisticsVerticalComponent
                  stats={statisticsStore.statistics.invoiceCount?.toString()}
                  color='error'
                  title={t('dashboard_page.invoices')}
                  subtitle={`${t('dashboard_page.year_of')} ${format(year ?? new Date(), 'yyyy')}`}
                  icon={<Icon icon='mdi:file-document-outline' />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardStatisticsVerticalComponent
                  stats={statisticsStore.statistics.userCount?.toString()}
                  color='warning'
                  title={t('dashboard_page.users')}
                  subtitle={t('dashboard_page.in_total')}
                  icon={<Icon icon='mdi:account-outline' />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardStatisticsVerticalComponent
                  stats={statisticsStore.statistics.roleCount?.toString()}
                  color='info'
                  title={t('dashboard_page.roles')}
                  subtitle={t('dashboard_page.in_total')}
                  icon={<Icon icon='mdi:shield-outline' />}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrganizationTotalCard
              title={t('dashboard_page.total_uncategorized_incomes')}
              type={InvoiceType.INCOME}
              invoices={invoiceStore.invoices}
              total={statisticsStore.statistics.totalUncategorizedIncome}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrganizationTotalCard
              title={t('dashboard_page.total_uncategorized_expenses')}
              type={InvoiceType.EXPENSE}
              invoices={invoiceStore.invoices}
              total={statisticsStore.statistics.totalUncategorizedExpense}
            />
          </Grid>

          <Grid item xs={12} md={4} sx={{ order: 0 }}>
            <OrganizationBudgetTracking data={statisticsStore.statistics} />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default Dashboard
