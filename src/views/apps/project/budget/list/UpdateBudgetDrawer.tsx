// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
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
import { updateBudget } from 'src/store/apps/organization/project/budget'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { BudgetResponseDto, UpdateBudgetRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

interface SidebarUpdateBudgetInterface {
  open: boolean
  toggle: (categoryId: number | null) => void
  projectId: number
  selectedBudget: BudgetResponseDto | null
  setSelectedBudget: (budget: BudgetResponseDto | null) => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  amount: yup.string()
})

export interface UpdateCategoryData {
  amount?: string
}

const SidebarUpdateBudget = (props: SidebarUpdateBudgetInterface) => {
  // ** Props
  const { open, toggle, projectId, selectedBudget, setSelectedBudget } = props

  const defaultValues = {
    amount: selectedBudget?.amount
  }

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
  const onSubmit = () => {
    if (!selectedBudget) return

    const updateBudgetRequest: UpdateBudgetRequestDto = {
      amount: selectedBudget.amount
    }

    dispatch(
      updateBudget({
        organizationId,
        projectId,
        budgetId: selectedBudget.id,
        ...updateBudgetRequest
      })
    )
    toggle(null)
    reset()
  }

  const handleClose = () => {
    toggle(null)
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
        <Typography variant='h6'>{t('project_page.budget.update_budget')}</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {selectedBudget && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='amount'
                control={control}
                rules={{ required: true }}
                render={() => (
                  <TextField
                    type='number'
                    value={selectedBudget.amount}
                    label={`${t('project_page.budget.amount')} *`}
                    onChange={e => {
                      setSelectedBudget({ ...selectedBudget, amount: e.target.value as unknown as number })
                    }}
                    placeholder='Other Expenses'
                    error={Boolean(errors.amount)}
                  />
                )}
              />
              {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
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
        )}
      </Box>
    </Drawer>
  )
}

export default SidebarUpdateBudget
