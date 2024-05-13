// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { CurrencyType, OrganizationStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Utils Imports
import { formatCurrencyAsCompact, formatCurrencyAsStandard } from 'src/utils/currency'
import { getInvoiceListUrl } from 'src/utils/router'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'

interface DataType {
  title: string
  icon: ReactNode
  subtitle: string
  avatarColor: ThemeColor
}

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

export interface OrganizationTotalProfitProps {
  data: OrganizationStatisticsResponseDto
}

const OrganizationTotalProfit = ({ data }: OrganizationTotalProfitProps) => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  const dataFormat: DataType[] = [
    {
      title: formatCurrencyAsStandard(data.totalIncome - data.totalExpense ?? 0, Locale.EN, CurrencyType.USD),
      avatarColor: 'primary',
      subtitle: t('dashboard_page.total_profit'),
      icon: <Icon icon='mdi:trending-up' fontSize='1.875rem' />
    },
    {
      title: formatCurrencyAsStandard(data.totalIncome ?? 0, Locale.EN, CurrencyType.USD),
      avatarColor: 'success',
      subtitle: t('dashboard_page.total_income'),
      icon: <Icon icon='mdi:currency-usd' fontSize='1.875rem' />
    },
    {
      title: formatCurrencyAsStandard(data.totalExpense ?? 0, Locale.EN, CurrencyType.USD),
      avatarColor: 'error',
      subtitle: t('dashboard_page.total_expense'),
      icon: <Icon icon='mdi:poll' />
    }
  ]

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    colors: [theme.palette.error.main, theme.palette.success.main, theme.palette.primary.main],
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider,
      padding: {
        left: 0,
        bottom: -10
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    yaxis: {
      labels: {
        offsetY: 2,
        offsetX: -10,
        formatter: (value: number) =>
          value >= 0 ? `${(value / 1000).toFixed(0)}k` : `-${(Math.abs(value) / 1000).toFixed(0)}k`,
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '55%'
            }
          }
        }
      }
    ]
  }

  const series = [
    {
      name: 'Expense',
      data: data.expensesByMonth
    },
    {
      name: 'Income',
      data: data.incomesByMonth
    },
    {
      name: 'Profit',
      data: data.incomesByMonth ? data.incomesByMonth.map((income, index) => income - data.expensesByMonth[index]) : []
    }
  ]

  return (
    <Card>
      <Grid container>
        <StyledGrid item xs={12} sm={8}>
          <CardContent sx={{ height: '100%', '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
            <Typography variant='h6'>{t('dashboard_page.total_profit')}</Typography>
            {data.id && <ReactApexcharts type='bar' height={282} series={series} options={options} />}
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} sm={4}>
          <CardHeader
            title={formatCurrencyAsCompact(data.balance ?? 0, Locale.EN, CurrencyType.USD)}
            subheader='Last year balance $234.40k'
            subheaderTypographyProps={{ sx: { lineHeight: '1.25rem', fontSize: '0.875rem !important' } }}
            titleTypographyProps={{
              sx: {
                fontSize: '1.5rem !important',
                lineHeight: '2rem !important',
                letterSpacing: '0.43px !important'
              }
            }}
            action={
              <OptionsMenu
                options={['Last 28 Days', 'Last Month', 'Last Year']}
                iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
              />
            }
          />
          <CardContent
            sx={{ pt: theme => `${theme.spacing(4)} !important`, pb: theme => `${theme.spacing(5.5)} !important` }}
          >
            {dataFormat.map((item: DataType, index: number) => {
              return (
                <Box key={index} sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={item.avatarColor}
                    sx={{ mr: 3.5, '& svg': { color: `${item.avatarColor}.main` } }}
                  >
                    {item.icon}
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                    <Typography variant='body2'>{item.subtitle}</Typography>
                  </Box>
                </Box>
              )
            })}
            <Button fullWidth variant='contained' onClick={() => router.replace(getInvoiceListUrl())}>
              {t('dashboard_page.view_invoices')}
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default OrganizationTotalProfit
