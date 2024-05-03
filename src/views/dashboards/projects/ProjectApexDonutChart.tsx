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
import { CurrencyType, ProjectStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Utils Imports
import { formatCurrencyAsCompact } from 'src/utils/currency'

export interface ProjectApexDonutChartProps {
  data: ProjectStatisticsResponseDto
}

const ProjectApexDonutChart = ({ data }: ProjectApexDonutChartProps) => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: data.expensesByCategory ? data.expensesByCategory.map(expense => expense.name) : [],

    colors: data.expensesByCategory
      ? data.expensesByCategory.map(expense => (theme.palette as any)[expense.color].main)
      : [],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${formatCurrencyAsCompact(val, Locale.EN, CurrencyType.USD)}`
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
              formatter: (val: string) => `${formatCurrencyAsCompact(parseInt(val), Locale.EN, CurrencyType.USD)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Total Expense',
              formatter: () => formatCurrencyAsCompact(data.totalExpense, Locale.EN, CurrencyType.USD),
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

  const series = data.expensesByCategory ? data.expensesByCategory.map(expense => expense.total) : []

  return (
    <Card>
      <CardHeader
        title='Expense Ratio'
        subheader='Spending on various categories'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type='donut' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ProjectApexDonutChart
