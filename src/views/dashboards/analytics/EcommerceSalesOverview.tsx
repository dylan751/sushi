// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const EcommerceSalesOverview = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
      hexToRGBA(theme.palette.primary.main, 0.5),
      theme.palette.customColors.trackBg
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: ['Apparel', 'Electronics', 'FMCG', 'Other Sales'],
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
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              fontSize: '0.875rem',
              color: theme.palette.text.secondary
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              formatter: value => `${value}k`,
              color: theme.palette.text.primary
            },
            total: {
              show: true,
              fontSize: '0.875rem',
              label: 'Weekly Sales',
              color: theme.palette.text.secondary,
              formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}k`
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Sales Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent>
        <Grid container sx={{ my: [0, 4, 1.625] }}>
          <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={300} series={[12, 25, 13, 50]} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                <Icon icon='mdi:currency-usd' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>Number of Sales</Typography>
                <Typography variant='h6'>$86,400</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            <Grid container>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: 'primary.main' }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>Apparel</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>$12,150</Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: hexToRGBA(theme.palette.primary.main, 0.7) }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>Electronic</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>$24,900</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: hexToRGBA(theme.palette.primary.main, 0.5) }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>FMCG</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>$12,750</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: 'customColors.trackBg' }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>Other Sales</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>$50,200</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceSalesOverview
