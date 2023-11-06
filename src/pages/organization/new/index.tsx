import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

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

// ** Hooks
import { useApi } from 'src/hooks/useApi'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  name: yup.string().max(256).required(),
  uniqueName: yup.string().min(2).required()
})

const defaultValues = {
  name: 'Example Organization',
  uniqueName: 'example-org'
}

const CreateOrganizationPage = () => {
  const { $api } = useApi()

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
    $api.internal
      .organizationsControllerCreate(data)
      .then(() => {
        location.replace('/organization')
      })
      .catch(res => {
        console.log(res)
        setError('name', {
          type: 'manual',
          message: res.response.data.message
        })
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ width: 1 / 2 }}>
        <CardHeader title='Create Orgnanization' />
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
                        label='Organization Name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        placeholder='Enter new organization name'
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
                        label='Organization URL'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        placeholder='Enter new organization unique URL'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='mdi:office-xml' />
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
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

CreateOrganizationPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CreateOrganizationPage
