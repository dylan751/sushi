// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { addBudget } from 'src/store/apps/budget'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { CategoryResponseDto, CreateBudgetRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

interface SidebarAddBudgetInterface {
  open: boolean
  toggle: () => void
  projectId: string
  categories: CategoryResponseDto[]
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const schema = yup.object().shape({
  amount: yup.string().required(),
  categoryId: yup.string().required()
})

const defaultValues = {
  amount: '',
  categoryId: ''
}

export interface CreateBudgetData {
  amount: string
  categoryId: string
}

const SidebarAddBudget = (props: SidebarAddBudgetInterface) => {
  // ** Props
  const { open, toggle, projectId, categories } = props

  // ** Hooks
  const { t } = useTranslation()
  const { organizationId } = useCurrentOrganization()
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: CreateBudgetData) => {
    const createBudgetRequest: CreateBudgetRequestDto = {
      amount: parseInt(data.amount),
      categoryId: parseInt(data.categoryId)
    }

    dispatch(addBudget({ organizationId, projectId: parseInt(projectId), ...createBudgetRequest }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t('project_page.budget.add_category')}</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='amount'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='text'
                  value={value}
                  label={`${t('project_page.budget.amount')} *`}
                  onChange={onChange}
                  placeholder='Other Expenses'
                  error={Boolean(errors.amount)}
                />
              )}
            />
            {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='categoryId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <InputLabel id='icon-select'>{t('project_page.budget.category')} *</InputLabel>
                  <Select
                    fullWidth
                    value={value}
                    id='category'
                    label={t('project_page.budget.category')}
                    labelId='category'
                    onChange={e => {
                      onChange(e.target.value)
                    }}
                    inputProps={{ placeholder: t('project_page.budget.category').toString() }}
                    MenuProps={MenuProps}
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors.categoryId && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.categoryId.message}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {t('button.submit')}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('button.cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddBudget
