// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Types Imports
import BIDVExchangeRates, { ExchangeRateType } from '../../exchange-rates/BIDV'
import { CurrencyType } from 'src/__generated__/AccountifyAPI'

// ** Utils Imports
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { Locale } from 'src/enum'
import { getInitials } from 'src/@core/utils/get-initials'
import { format } from 'date-fns'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

export interface AddActionsProps {
  onSubmit: () => void
  isSubmitDisabled: () => boolean
}

interface CellType {
  row: ExchangeRateType
}

const renderCurrencyImage = (row: ExchangeRateType) => {
  if (row.image) {
    return <CustomAvatar src={`https://bidv.com.vn/${row.image}`} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color='primary' sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.currency ? row.currency : 'USD')}
      </CustomAvatar>
    )
  }
}

const AddActions = ({ onSubmit, isSubmitDisabled }: AddActionsProps) => {
  const { t } = useTranslation()
  const { organization } = useCurrentOrganization()

  const columns: GridColDef[] = [
    {
      flex: 0.3,
      minWidth: 140,
      field: 'currency',
      headerName: t('exchange_rates.currency') as string,
      renderCell: ({ row }: CellType) => {
        const { nameVI, currency } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderCurrencyImage(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              {nameVI}
              <Typography noWrap variant='caption'>
                {currency}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'muaTm',
      headerName: t('exchange_rates.buy_tm') as string,
      renderCell: ({ row }: CellType) => {
        // Convert '25,801' into '25081' for formatting currency function
        const formattedMuaTm = row.muaTm.replace(',', '')

        return (
          <Typography noWrap variant='body2'>
            {parseFloat(formattedMuaTm)
              ? formatCurrencyAsStandard(parseFloat(formattedMuaTm), Locale.EN, CurrencyType.VND)
              : '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'muaCk',
      headerName: t('exchange_rates.buy_ck') as string,
      renderCell: ({ row }: CellType) => {
        // Convert '25,801' into '25081' for formatting currency function
        const formattedMuaCk = row.muaCk.replace(',', '')

        return (
          <Typography noWrap variant='body2'>
            {parseFloat(formattedMuaCk)
              ? formatCurrencyAsStandard(parseFloat(formattedMuaCk), Locale.EN, CurrencyType.VND)
              : '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'ban',
      headerName: t('exchange_rates.sell') as string,
      renderCell: ({ row }: CellType) => {
        // Convert '25,801' into '25081' for formatting currency function
        const formattedBan = row.ban.replace(',', '')

        return (
          <Typography noWrap variant='body2'>
            {parseFloat(formattedBan)
              ? formatCurrencyAsStandard(parseFloat(formattedBan), Locale.EN, CurrencyType.VND)
              : '-'}
          </Typography>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button
              fullWidth
              sx={{ mb: 3.5 }}
              variant='contained'
              startIcon={<Icon icon='mdi:send-outline' />}
              disabled={isSubmitDisabled()}
              onClick={() => onSubmit()}
            >
              {t('invoice_page.add.create_invoice')}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' sx={{ mt: 0, mb: 1, color: 'text.primary' }}>
          {t('invoice_page.add.exchange_rates_today', {
            today: format(new Date(), organization?.dateFormat)
          })}
        </Typography>
        <Card sx={{ height: 400, overflowY: 'auto', overflowX: 'hidden' }}>
          <BIDVExchangeRates customColumns={columns} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddActions
