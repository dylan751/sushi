// ** React Imports
import { ReactNode } from 'react'

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
import { formatCurrencyAsStandard } from 'src/utils/currency'

// ** Types Import
import { CurrencyType, OrganizationStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ height: '140px', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
}

const colorPalette = [
  'primary.main',
  'success.main',
  'info.main',
  'warning.main',
  'error.main',
  'secondary.main',
  'primary.mail',
  'primary.mail'
]

export interface OrganizationBudgetOverviewProps {
  data: OrganizationStatisticsResponseDto
}

const OrganizationBudgetOverview = ({ data }: OrganizationBudgetOverviewProps) => {
  // ** Hook
  const theme = useTheme()
  const { t } = useTranslation()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.secondary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
      hexToRGBA(theme.palette.primary.main, 0.5)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: data.projects ? data.projects.map(project => project.name) : [],
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
              formatter: value => formatCurrencyAsStandard(parseFloat(value) ?? 0, Locale.EN, CurrencyType.USD),
              color: theme.palette.text.primary
            },
            total: {
              show: true,
              fontSize: '0.875rem',
              label: t('dashboard_page.total_budget').toString(),
              color: theme.palette.text.secondary,
              formatter: value =>
                formatCurrencyAsStandard(
                  parseFloat(value.globals.seriesTotals.reduce((total: number, num: number) => total + num)) ?? 0,
                  Locale.EN,
                  CurrencyType.USD
                )
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title={t('dashboard_page.project_budget_overview')}
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
            {data.id && (
              <ReactApexcharts
                type='donut'
                height={300}
                series={data.projects ? data.projects.map(project => project.totalBudget) : []}
                options={options}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                <Icon icon='mdi:currency-usd' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>{t('dashboard_page.total_budget_for_projects')}</Typography>
                <Typography variant='h6'>
                  {formatCurrencyAsStandard(
                    data.projects
                      ? data.projects.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.totalBudget
                        }, 0)
                      : 0,
                    Locale.EN,
                    CurrencyType.USD
                  )}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            <ScrollWrapper>
              <Grid container>
                {data.projects &&
                  data.projects.map((project, index) => (
                    <Grid item xs={6} sx={{ mb: 4 }} key={project.id}>
                      <Box
                        sx={{
                          mb: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { mr: 1.5, fontSize: '0.75rem', color: colorPalette[index] }
                        }}
                      >
                        <Icon icon='mdi:circle' />
                        <Typography variant='body2'>{project.name}</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatCurrencyAsStandard(project.totalBudget ?? 0, Locale.EN, CurrencyType.USD)}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </ScrollWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrganizationBudgetOverview
