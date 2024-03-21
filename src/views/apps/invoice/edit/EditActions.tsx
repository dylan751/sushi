// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Imports
import { getInvoicePreviewUrl } from 'src/utils/router/invoice'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

interface EditActionsProps {
  id: string | undefined
  onSubmit: () => void
  isSubmitDisabled: () => boolean
  toggleAddPaymentDrawer: () => void
}

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const EditActions = ({ id, onSubmit, isSubmitDisabled, toggleAddPaymentDrawer }: EditActionsProps) => {
  // ** Hook
  const { t } = useTranslation()

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
        <OptionsWrapper sx={{ mb: 1 }}>
          <InputLabel
            htmlFor='invoice-edit-payment-terms'
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
          >
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-edit-payment-terms' />
        </OptionsWrapper>
        <OptionsWrapper sx={{ mb: 1 }}>
          <InputLabel
            htmlFor='invoice-edit-client-notes'
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
          >
            Client Notes
          </InputLabel>
          <Switch id='invoice-edit-client-notes' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel
            htmlFor='invoice-edit-payment-stub'
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
          >
            Payment Stub
          </InputLabel>
          <Switch id='invoice-edit-payment-stub' />
        </OptionsWrapper>
      </Grid>
    </Grid>
  )
}

export default EditActions
