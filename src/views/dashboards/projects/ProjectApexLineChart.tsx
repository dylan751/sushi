// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Type Imports
import { ProjectStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Utils Imports
import { convertCurrencyValue, formatCurrencyAsCompact } from 'src/utils/currency'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'
import { useCurrentOrganization } from 'src/hooks'

export interface ProjectApexLineChartProps {
  data: ProjectStatisticsResponseDto
}

const ProjectApexLineChart = ({ data }: ProjectApexLineChartProps) => {
  // ** Hook
  const { organization } = useCurrentOrganization()
  const theme = useTheme()
  const { t } = useTranslation()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: true }
    },
    colors: [theme.palette.error.main, theme.palette.success.main],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#FF4C51', '#56CA00'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${formatCurrencyAsCompact(
            convertCurrencyValue(
              data.series[data.seriesIndex][data.dataPointIndex],
              organization?.currency,
              organization?.exchangeRate
            ),
            Locale.EN,
            organization?.currency
          )}</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
  }

  const series = [
    {
      name: t('project_page.dashboard.expense'),
      data: data.expensesByMonth
    },
    {
      name: t('project_page.dashboard.income'),
      data: data.incomesByMonth
    }
  ]

  return (
    <Card>
      <CardHeader
        title={t('project_page.dashboard.balance')}
        subheader={t('project_page.dashboard.total_invoice_value')}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }} color={data.balance > 0 ? 'success.main' : 'error.main'}>
              {formatCurrencyAsCompact(
                convertCurrencyValue(data.balance, organization?.currency, organization?.exchangeRate),
                Locale.EN,
                organization?.currency
              )}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        {data.id && <ReactApexcharts type='line' height={370} options={options} series={series} />}
      </CardContent>
    </Card>
  )
}

export default ProjectApexLineChart
