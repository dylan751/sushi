// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Component Imports
import { BarChart, Bar, ResponsiveContainer } from 'recharts'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

interface DataType {
  title: string
  sales: string
  trendDir: string
  color: ThemeColor
  trendNumber: string
}

const data: DataType[] = [
  {
    sales: '86,471',
    title: 'Direct',
    trendDir: 'down',
    color: 'success',
    trendNumber: '15%'
  },
  {
    trendDir: 'up',
    sales: '57,484',
    title: 'Organic',
    color: 'primary',
    trendNumber: '85%'
  },
  {
    sales: '2,534',
    trendDir: 'up',
    color: 'warning',
    title: 'Referral',
    trendNumber: '48%'
  },
  {
    sales: '977',
    title: 'Mail',
    color: 'error',
    trendDir: 'down',
    trendNumber: '36%'
  }
]

const chartData = [
  { value: 50 },
  { value: 30 },
  { value: 100 },
  { value: 75 },
  { value: 40 },
  { value: 75 },
  { value: 20 }
]

const EcommerceWebsiteStatistics = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card>
      <CardHeader
        title='Website Statistics'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            iconProps={{ fontSize: '1.375rem' }}
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent>
        <Box sx={{ mt: 2.75, mb: 4.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h3'>4,590</Typography>
            <Typography variant='caption'>Total Traffic</Typography>
          </Box>
          <Box sx={{ height: 75, width: '100%', maxWidth: '120px' }}>
            <ResponsiveContainer>
              <BarChart height={100} data={chartData}>
                <Bar dataKey='value' fill={theme.palette.primary.main} radius={4} barSize={5} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              {data.map((row: DataType) => {
                return (
                  <TableRow
                    key={row.title}
                    sx={{
                      '&:last-of-type td': { border: 0, pb: 0 },
                      '& .MuiTableCell-root': {
                        py: theme => `${theme.spacing(3.125)} !important`,
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 }
                      },
                      '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` }
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.8, color: `${row.color}.main` } }}
                      >
                        <Icon icon='mdi:circle' fontSize='1.05rem' />
                        <Typography sx={{ fontSize: '0.875rem' }}>{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.sales}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          '& svg': { color: row.trendDir === 'down' ? 'error.main' : 'success.main' }
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.trendNumber}</Typography>
                        <Icon icon={row.trendDir === 'down' ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default EcommerceWebsiteStatistics
