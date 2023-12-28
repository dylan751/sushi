// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { updateProfile } from 'src/store/auth/profile'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

// ** Type Imports
import { UpdateProfileRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

type FormDataType = UpdateProfileRequestDto & { email: string }

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
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
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('yes')
  const [formData, setFormData] = useState<FormDataType>(initialData)
  const [imgSrc, setImgSrc] = useState<string>(store.data.avatar || '/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const onUpdateAccount = () => {
    dispatch(updateProfile(formData))
  }

  const onDeleteAccount = () => setOpen(true)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc(store.data.avatar || '/images/avatars/1.png')
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
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    {t('button.reset')}
                  </ResetButtonStyled>
                  <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </div>
              </Box>
            </CardContent>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('account_settings_page.account.full_name')}
                    placeholder='John'
                    value={formData.name}
                    onChange={e => handleFormChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label={t('account_settings_page.account.email')}
                    value={formData.email}
                    placeholder='john.doe@example.com'
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='phone'
                    label={t('account_settings_page.account.phone_number')}
                    value={formData.phone}
                    placeholder='202 555 0111'
                    onChange={e => handleFormChange('phone', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position='start'>VN (+84)</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('account_settings_page.account.address')}
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

      {/* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t('account_settings_page.account.delete_account')} />
          <CardContent>
            <form onSubmit={handleSubmit(onDeleteAccount)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name='checkbox'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label={t('account_settings_page.account.account_deactivation_checkbox')}
                        sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                        control={
                          <Checkbox
                            {...field}
                            size='small'
                            name='validation-basic-checkbox'
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                      {t('account_settings_page.account.account_deactivation_warning')}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                {t('account_settings_page.account.deactivate_account')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography>{t('account_settings_page.account.account_deactivation_confirm')}</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
            {t('button.yes')}
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            {t('button.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 8,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 5 }}>
              {userInput === 'yes'
                ? t('account_settings_page.account.deleted')
                : t('account_settings_page.account.cancelled')}
            </Typography>
            <Typography>
              {userInput === 'yes'
                ? t('account_settings_page.account.account_deactivation_success')
                : t('account_settings_page.account.account_deactivation_fail')}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            {t('button.ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default TabAccount
