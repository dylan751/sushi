// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
import { getInvoicePreviewUrl } from 'src/utils/router/invoice'
import { getInitials } from 'src/@core/utils/get-initials'
import { formatCurrencyAsStandard } from 'src/utils/currency'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

// ** Types Imports
import { BIDVResponseType, ExchangeRateType } from 'src/pages/[organization]/exchange-rates'
import { Locale } from 'src/enum'
import { CurrencyType } from 'src/__generated__/AccountifyAPI'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

interface EditActionsProps {
  id: string | undefined
  onSubmit: () => void
  isSubmitDisabled: () => boolean
  toggleAddPaymentDrawer: () => void
  exchangeRates: BIDVResponseType | undefined
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

const EditActions = ({ id, onSubmit, isSubmitDisabled, toggleAddPaymentDrawer, exchangeRates }: EditActionsProps) => {
  // ** Hook
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
              {t('invoice_page.edit.update_invoice')}
            </Button>
            <Button
              fullWidth
              sx={{ mb: 3.5 }}
              component={Link}
              color='secondary'
              variant='outlined'
              href={getInvoicePreviewUrl(id)}
            >
              {t('invoice_page.edit.preview')}
            </Button>
            <Button fullWidth color='secondary' variant='outlined' sx={{ mb: 3.5 }}>
              Save
            </Button>
            <Button
              fullWidth
              color='success'
              variant='contained'
              onClick={toggleAddPaymentDrawer}
              startIcon={<Icon icon='mdi:currency-usd' />}
            >
              Add Payment
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id='payment-select'>Accept payments via</InputLabel>
          <Select
            fullWidth
            defaultValue='Internet Banking'
            label='Accept payments via'
            labelId='payment-select'
            sx={{ mb: 4 }}
          >
            <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
            <MenuItem value='Debit Card'>Debit Card</MenuItem>
            <MenuItem value='Credit Card'>Credit Card</MenuItem>
            <MenuItem value='Paypal'>Paypal</MenuItem>
            <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' sx={{ mt: 0, mb: 1, color: 'text.primary' }}>
          {t('invoice_page.add.exchange_rates_today', {
            today: format(new Date(), organization?.dateFormat)
          })}
        </Typography>
        <Card sx={{ height: 400, overflowY: 'auto', overflowX: 'hidden' }}>
          <DataGrid
            autoHeight
            rows={exchangeRates ? exchangeRates.data : []}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={row => `${row.nameVI} - ${row.image}`}

            // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditActions
