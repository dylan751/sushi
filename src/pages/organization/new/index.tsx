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
  TextField
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

const schema = yup.object().shape({
  name: yup.string().max(256).required(),
  uniqueName: yup.string().min(2).required()
})

const defaultValues = {
  name: 'Example Organization',
  uniqueName: 'example-org'
}

const CreateOrganizationPage = () => {
  // ** Hooks
  const session = useSession()
  const { t } = useTranslation()

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
      <Card sx={{ width: 1 / 2 }}>
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
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
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
