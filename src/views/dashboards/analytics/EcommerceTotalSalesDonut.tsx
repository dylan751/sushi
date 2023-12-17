// ** Material UI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const EcommerceTotalSalesDonut = () => {
  // ** Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false }
    },
    stroke: {
      width: 6,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main],
    grid: {
      padding: {
        top: -7,
        bottom: 5
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              offsetY: -2,
              formatter: () => '28%',
              color: theme.palette.text.primary
            },
            value: {
              offsetY: 2,
              fontSize: '0.75rem',
              formatter: () => '1 Quarter',
              color: theme.palette.text.secondary
            },
            total: {
              show: true,
              label: '18%',
              fontWeight: 500,
              fontSize: '1.25rem',
              formatter: () => '1 Quarter',
              color: theme.palette.text.primary
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardContent sx={{ py: `${theme.spacing(3.75)} !important` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ my: 1.25 }}>
            <Typography variant='h6' sx={{ mb: 5 }}>
              Total Sales
            </Typography>
            <Typography component='p' variant='caption' sx={{ lineHeight: '1.25rem' }}>
              Calculated in last 7 days
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
              <Typography variant='h6'>$25,980</Typography>
              <Icon icon='mdi:chevron-up' />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                15.6%
              </Typography>
            </Box>
          </Box>
          <ReactApexcharts type='donut' width={110} height={125} options={options} series={[80, 22, 30, 50]} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default EcommerceTotalSalesDonut
