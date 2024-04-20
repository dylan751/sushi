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

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { updateCategory } from 'src/store/apps/category'

// ** Types Imports
import { AppDispatch } from 'src/store'
import {
  CategoryResponseDto,
  ColorType,
  UpdateCategoryRequestDto,
  InvoiceType,
  IconType
} from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

// ** Utils Imports
import { capitalizeFirstLetter } from 'src/utils/string'

interface SidebarUpdateCategoryInterface {
  open: boolean
  toggle: (categoryId: number | null) => void
  projectId: string
  selectedCategory: CategoryResponseDto | null
  setSelectedCategory: (category: CategoryResponseDto | null) => void
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
  name: yup.string(),
  icon: yup.string(),
  color: yup.string(),
  type: yup.string()
})

export interface UpdateCategoryData {
  name?: string
  icon?: string
  color?: ColorType
  type?: InvoiceType
}

const SidebarUpdateCategory = (props: SidebarUpdateCategoryInterface) => {
  // ** Props
  const { open, toggle, projectId, selectedCategory, setSelectedCategory } = props

  const defaultValues = {
    name: selectedCategory?.name,
    icon: selectedCategory?.icon,
    color: selectedCategory?.color ?? ColorType.PRIMARY,
    type: selectedCategory?.name ?? InvoiceType.EXPENSE
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
    if (!selectedCategory) return

    const updateCategoryRequest: UpdateCategoryRequestDto = {
      name: selectedCategory.name,
      icon: selectedCategory.icon,
      color: selectedCategory.color,
      type: selectedCategory.type
    }

    dispatch(
      updateCategory({
        organizationId,
        projectId: parseInt(projectId),
        categoryId: selectedCategory.id,
        ...updateCategoryRequest
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
        <Typography variant='h6'>{t('project_page.category.update_category')}</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {selectedCategory && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={() => (
                  <TextField
                    type='name'
                    value={selectedCategory.name}
                    label={`${t('project_page.category.name')} *`}
                    onChange={e => {
                      setSelectedCategory({ ...selectedCategory, name: e.target.value })
                    }}
                    placeholder='Other Expenses'
                    error={Boolean(errors.name)}
                  />
                )}
              />
              {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='icon'
                control={control}
                rules={{ required: true }}
                render={() => (
                  <>
                    <InputLabel id='icon-select'>{t('project_page.category.icon')} *</InputLabel>
                    <Select
                      fullWidth
                      value={selectedCategory.icon}
                      id='icon'
                      label={t('project_page.category.icon')}
                      labelId='icon'
                      onChange={e => {
                        setSelectedCategory({ ...selectedCategory, icon: e.target.value as IconType })
                      }}
                      inputProps={{ placeholder: t('project_page.category.icon').toString() }}
                      MenuProps={MenuProps}
                    >
                      {Object.values(IconType).map(icon => (
                        <MenuItem key={icon} value={icon}>
                          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                            <Icon icon={icon} fontSize={20} />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.icon && <FormHelperText sx={{ color: 'error.main' }}>{errors.icon.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='color'
                control={control}
                rules={{ required: true }}
                render={() => (
                  <>
                    <InputLabel id='color-select'>{t('project_page.category.color')} *</InputLabel>
                    <Select
                      fullWidth
                      value={selectedCategory.color}
                      id='color'
                      label={t('project_page.category.color')}
                      labelId='color'
                      onChange={e => {
                        setSelectedCategory({ ...selectedCategory, color: e.target.value as any })
                      }}
                      inputProps={{ placeholder: t('project_page.category.name').toString() }}
                      MenuProps={MenuProps}
                    >
                      {Object.values(ColorType).map(color => (
                        <MenuItem key={color} value={color}>
                          <CustomChip size='small' skin='light' color={color as any} label={color} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.color && <FormHelperText sx={{ color: 'error.main' }}>{errors.color.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={() => (
                  <>
                    <InputLabel id='type-select'>{t('project_page.category.type')} *</InputLabel>
                    <Select
                      fullWidth
                      value={selectedCategory.type}
                      id='type'
                      label={t('project_page.category.type')}
                      labelId='type'
                      onChange={e => {
                        setSelectedCategory({ ...selectedCategory, type: e.target.value as InvoiceType })
                      }}
                      inputProps={{ placeholder: t('project_page.category.type').toString() }}
                      MenuProps={MenuProps}
                    >
                      {Object.values(InvoiceType).map(type => (
                        <MenuItem key={type} value={type}>
                          {capitalizeFirstLetter(type)}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.type && <FormHelperText sx={{ color: 'error.main' }}>{errors.type.message}</FormHelperText>}
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

export default SidebarUpdateCategory
