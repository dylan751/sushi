// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Icon Imports
import { updateProfile } from 'src/store/auth/profile'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

// ** Type Imports
import { UpdateProfileRequestDto } from 'src/__generated__/AccountifyAPI'

type FormDataType = UpdateProfileRequestDto & { email: string }

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const TabAccount = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.profile)
  const { t } = useTranslation()

  const initialData: FormDataType = {
    email: store.data.email || '',
    phone: store.data.phone || '',
    address: store.data.address || '',
    name: store.data.name || ''
  }

  // ** State
  const [formData, setFormData] = useState<FormDataType>(initialData)

  // ** Hooks
  const {
    formState: {}
  } = useForm({ defaultValues: { checkbox: false } })

  const onUpdateAccount = () => {
    dispatch(updateProfile(formData))
  }

  const handleFormChange = (
    field: keyof UpdateProfileRequestDto,
    value: UpdateProfileRequestDto[keyof UpdateProfileRequestDto]
  ) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <form>
            <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={store.data.avatar || '/images/avatars/1.png'} alt='Profile Pic' />
              </Box>
            </CardContent>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('settings_page.account.full_name')}
                    placeholder='John'
                    value={formData.name}
                    onChange={e => handleFormChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label={t('settings_page.account.email')}
                    value={formData.email}
                    placeholder='john.doe@example.com'
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='phone'
                    label={t('settings_page.account.phone_number')}
                    value={formData.phone}
                    placeholder='202 555 0111'
                    onChange={e => handleFormChange('phone', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position='start'>VN (+84)</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('settings_page.account.address')}
                    placeholder='Address'
                    value={formData.address}
                    onChange={e => handleFormChange('address', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ mr: 4 }} onClick={onUpdateAccount}>
                    {t('button.save_changes')}
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
                    {t('button.reset')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabAccount
