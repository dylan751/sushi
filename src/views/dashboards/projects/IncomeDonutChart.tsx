// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Types Imports
import { OrganizationStatisticsResponseDto, ProjectStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Utils Imports
import { convertCurrencyValue, formatCurrencyAsCompact } from 'src/utils/currency'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'
import { useCurrentOrganization } from 'src/hooks'

export interface IncomeDonutChartProps {
  data: ProjectStatisticsResponseDto | OrganizationStatisticsResponseDto
}

const IncomeDonutChart = ({ data }: IncomeDonutChartProps) => {
  // ** Hook
  const { organization } = useCurrentOrganization()
  const theme = useTheme()
  const { t } = useTranslation()

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: data.incomesByCategory ? data.incomesByCategory.map(income => income.name) : [],

    colors: data.incomesByCategory
      ? data.incomesByCategory.map(income => (theme.palette as any)[income.color].main)
      : [],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) =>
          `${formatCurrencyAsCompact(
            convertCurrencyValue(val, organization?.currency, organization?.exchangeRate),
            Locale.EN,
            organization?.currency
          )}`
      }
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) =>
                `${formatCurrencyAsCompact(
                  convertCurrencyValue(parseInt(val), organization?.currency, organization?.exchangeRate),
                  Locale.EN,
                  organization?.currency
                )}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: t('project_page.dashboard.total_income') as string,
              formatter: () =>
                formatCurrencyAsCompact(
                  convertCurrencyValue(data.totalIncome, organization?.currency, organization?.exchangeRate),
                  Locale.EN,
                  organization?.currency
                ),
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const series = data.incomesByCategory ? data.incomesByCategory.map(income => income.total) : []

  return (
    <Card>
      <CardHeader
        title={t('project_page.dashboard.income_ratio')}
        subheader={t('project_page.dashboard.income_chart_subtitle')}
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        {data.id && <ReactApexcharts type='donut' height={400} options={options} series={series} />}
      </CardContent>
    </Card>
  )
}

export default IncomeDonutChart
