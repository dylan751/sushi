import { useState } from 'react'

import BIDVExchangeRates from 'src/views/apps/exchange-rates/BIDV'
import VCBExchangeRates from 'src/views/apps/exchange-rates/VCB'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useTranslation } from 'react-i18next'
import { useCurrentOrganization } from 'src/hooks'

// ** Enums Imports
import { BankUrl } from 'src/enum'

// ** Utils Imports
import { format } from 'date-fns'

// ** Types Imports
import { BankType } from 'src/__generated__/AccountifyAPI'

const ExchangeRates = () => {
  // ** States
  const [source, setSource] = useState<BankType>(BankType.BIDV)

  // ** Hooks
  const { t } = useTranslation()
  const { organization } = useCurrentOrganization()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={t('invoice_page.add.exchange_rates_today', {
              today: format(new Date(), organization?.dateFormat)
            })}
          />
          <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
            <Select
              size='small'
              value={source}
              sx={{ width: { sm: '220px', xs: '170px' } }}
              onChange={e => {
                setSource(e.target.value as BankType)
              }}
            >
              <MenuItem value={BankType.BIDV}>
                <Typography sx={{ color: 'primary.main', fontWeight: '500' }}>
                  {t('exchange_rates.bidv_bank')}
                </Typography>
              </MenuItem>
              <MenuItem value={BankType.VCB}>
                <Typography sx={{ color: 'primary.main', fontWeight: '500' }}>
                  {t('exchange_rates.vcb_bank')}
                </Typography>
              </MenuItem>
            </Select>
            <IconButton href={BankUrl[source]} target='_blank'>
              <Icon icon='mdi:link-variant' />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
      {source === BankType.BIDV && <BIDVExchangeRates />}
      {source === BankType.VCB && <VCBExchangeRates />}
    </Grid>
  )
}

export default ExchangeRates
