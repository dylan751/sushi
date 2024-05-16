// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Type Imports
import { UpdateOrganizationRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { updateOrganization } from 'src/store/apps/organization'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useSession } from 'next-auth/react'
import { $api } from 'src/utils/api'
import { useTranslation } from 'react-i18next'

const OrganizationAddressCard = () => {
  // ** Hooks
  const session = useSession()
  const { organizationId, organization } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  const defaultValues = {
    name: organization.name || '',
    phone: organization.phone || '',
    address: organization.address || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data: UpdateOrganizationRequestDto) => {
    dispatch(updateOrganization({ ...data, organizationId })).then(async () => {
      // Update current organization's session
      const response = await $api(session.data?.accessToken).internal.getUserProfile()
      session.update({ organizations: response.data.organizations })
    })
  }

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
              <TextField fullWidth label='TAX ID' placeholder='Enter TAX ID' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='VAT Number' placeholder='Enter VAT Number' />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                {t('button.save_changes')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default OrganizationAddressCard
