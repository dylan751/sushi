import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import UserBlankLayoutWithAppBar from 'src/layouts/UserBlankLayoutWithAppBar'

// ** MUI Imports
import Button from '@mui/material/Button'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'

// ** Types
import { CreateOrganizationRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

// ** Axios Imports
import { $api } from 'src/utils/api'

// ** Next Auth Imports
import { useSession } from 'next-auth/react'

// ** Utils Imports
import { getSelectOrganizationUrl } from 'src/utils/router'

const UNIQUE_NAME_FORMAT = /^([a-z][a-z0-9-]{1,})*$/

const schema = yup.object().shape({
  name: yup.string().max(256).required(),
  uniqueName: yup.string().min(2).matches(UNIQUE_NAME_FORMAT).required(),
  phone: yup.string().min(10).max(11).required(),
  address: yup.string().min(10).required()
})

const defaultValues = {
  name: 'Example Organization',
  uniqueName: 'example-org',
  phone: '0339089172',
  address: '19A Bach Khoa, Ha Noi'
}

const CreateOrganizationPage = () => {
  // ** Hooks
  const session = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: CreateOrganizationRequestDto) => {
    $api(session.data?.accessToken)
      .internal.organizationsControllerCreate(data)
      .then(async () => {
        const response = await $api(session.data?.accessToken).internal.getUserProfile()
        session.update({ organizations: response.data.organizations })
        router.replace(getSelectOrganizationUrl())
      })
      .catch(res => {
        setError('name', {
          type: 'manual',
          message: res.response.data.message
        })
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ width: { lg: '40%', md: '50%', sm: '70%', xs: '100%' } }}>
        <CardHeader title={t('new.create_organization')} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label={t('new.organization_name')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        placeholder={t('new.enter_new_organization_name')!}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='mdi:office-building-outline' />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography variant='subtitle1'>{process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/</Typography>
                <FormControl fullWidth>
                  <Controller
                    name='uniqueName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label={t('new.organization_url')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        placeholder={t('new.enter_new_organization_unique_url')!}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='mdi:xml' />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {errors.uniqueName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.uniqueName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 4, mt: 4 }}>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label={t('new.organization_phone')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        placeholder={t('new.enter_new_organization_phone')!}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='mdi:card-account-phone-outline' />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='address'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label={t('new.organization_address')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.address)}
                        placeholder={t('new.enter_new_organization_address')!}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='mdi:address-marker-outline' />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {errors.address && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Button type='submit' variant='contained' size='large'>
                  {t('new.create')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

CreateOrganizationPage.getLayout = (page: ReactNode) => <UserBlankLayoutWithAppBar>{page}</UserBlankLayoutWithAppBar>

export default CreateOrganizationPage
