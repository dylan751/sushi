// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Type Imports
import { BankType, CurrencyType, UpdateOrganizationRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { updateOrganization } from 'src/store/apps/organization'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useSession } from 'next-auth/react'
import { $api } from 'src/utils/api'
import { useTranslation } from 'react-i18next'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Constants Imports
import { MenuProps, dateFormatOptions } from 'src/constants'

import axios from 'axios'
import toast from 'react-hot-toast'
import convert from 'xml-js'
import { BIDVResponseType } from 'src/views/apps/exchange-rates/BIDV'
import { VCBResponseType } from 'src/views/apps/exchange-rates/VCB'
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { Locale } from 'src/enum'

const OrganizationInformationCard = () => {
  // ** Hooks
  const session = useSession()
  const { organizationId, organization } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  // ** States
  const [bank, setBank] = useState<BankType>(organization?.bank ?? BankType.BIDV)
  const [exchangeRate, setExchangeRate] = useState<string>((organization?.exchangeRate ?? 1).toString())

  const defaultValues = {
    name: organization.name || '',
    phone: organization.phone || '',
    address: organization.address || '',
    dateFormat: organization.dateFormat || 'dd/MM/yyyy',
    currency: organization.currency || CurrencyType.USD
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data: UpdateOrganizationRequestDto) => {
    const dataWithBank: UpdateOrganizationRequestDto = {
      ...data,
      bank,
      exchangeRate: parseFloat(exchangeRate)
    }

    dispatch(updateOrganization({ ...dataWithBank, organizationId })).then(async () => {
      // Update current organization's session
      const response = await $api(session.data?.accessToken).internal.getUserProfile()
      session.update({ organizations: response.data.organizations })
    })
  }

  useEffect(() => {
    const getExchangeRates = async () => {
      if (bank === BankType.VCB) {
        try {
          const res = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx')
          const jsonResult = convert.xml2json(res.data, {
            compact: true,
            spaces: 2
          })

          const exchangeData = JSON.parse(jsonResult) as VCBResponseType

          setExchangeRate(
            exchangeData.ExrateList.Exrate.find(
              exchange => exchange._attributes.CurrencyCode === 'USD'
            )?._attributes.Sell.replace(',', '') ?? ''
          )
        } catch (error) {
          toast.error('Error while fetching exchange rates!')
        }
      } else {
        try {
          const response = await axios.get('https://bidv.com.vn/ServicesBIDV/ExchangeDetailServlet')
          const exchangeData = response.data as BIDVResponseType

          setExchangeRate(exchangeData.data.find(exchange => exchange.currency === 'USD')!.ban.replace(',', ''))
        } catch (error) {
          toast.error('Error while fetching exchange rates!')
        }
      }
    }

    getExchangeRates()
  }, [bank])

  return (
    <Card>
      <CardHeader title={t('settings_page.organization.information_settings')} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label={t('settings_page.organization.organization_name')}
                      onChange={onChange}
                      placeholder={t('settings_page.organization.organization_name').toString()}
                      error={Boolean(errors.name)}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name='phone'
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      type='number'
                      label={t('settings_page.organization.phone_number')}
                      placeholder='202 555 0111'
                      value={value}
                      onChange={onChange}
                      InputProps={{ startAdornment: <InputAdornment position='start'>VN (+84)</InputAdornment> }}
                      error={Boolean(errors.phone)}
                    />
                  )}
                />
                {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='address'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label={t('settings_page.organization.organization_address')}
                      onChange={onChange}
                      placeholder={t('settings_page.organization.organization_address').toString()}
                      error={Boolean(errors.address)}
                    />
                  )}
                />
                {errors.address && <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='dateFormat'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputLabel id='dateFormat-select'>{t('settings_page.organization.date_format')} *</InputLabel>
                      <Select
                        fullWidth
                        value={value}
                        id='dateFormat'
                        label={t('settings_page.organization.date_format')}
                        labelId='dateFormat'
                        onChange={e => {
                          onChange(e.target.value)
                        }}
                        inputProps={{ placeholder: t('settings_page.organization.date_format').toString() }}
                        MenuProps={MenuProps}
                      >
                        {dateFormatOptions.map(dateFormat => (
                          <MenuItem key={dateFormat.value} value={dateFormat.value}>
                            <Typography>{dateFormat.label}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
                {errors.dateFormat && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.dateFormat.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='currency'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputLabel id='currency-select'>{t('settings_page.organization.default_currency')} *</InputLabel>
                      <Select
                        fullWidth
                        value={value}
                        id='currency'
                        label={t('settings_page.organization.default_currency')}
                        labelId='currency'
                        onChange={e => {
                          onChange(e.target.value)
                        }}
                        inputProps={{ placeholder: t('settings_page.organization.default_currency').toString() }}
                        MenuProps={MenuProps}
                      >
                        <MenuItem value={CurrencyType.USD}>USD</MenuItem>
                        <MenuItem value={CurrencyType.VND}>VND</MenuItem>
                      </Select>
                    </>
                  )}
                />
                {errors.currency && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.currency.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                sx={{ width: '100%' }}
                value={bank}
                onChange={e => {
                  setBank(e.target.value as BankType)
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
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ color: 'primary.main' }}>
                1 USD = {formatCurrencyAsStandard(parseFloat(exchangeRate), Locale.EN, CurrencyType.VND)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                sx={{ mr: 4 }}
                disabled={!ability?.can('update', 'organization')}
              >
                {t('button.save_changes')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default OrganizationInformationCard
