// ** Next Imports
import { useSession } from 'next-auth/react'

// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import { alpha, styled } from '@mui/material/styles'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'

// ** Types Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { Locale } from 'src/enum'
import { CategoryResponseDto, CurrencyType, InvoiceType, ProjectResponseDto } from 'src/__generated__/AccountifyAPI'
import { CreateInvoiceFormData } from 'src/pages/[organization]/invoice/add'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import Select from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import CustomChip from 'src/@core/components/mui/chip'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { InputAdornment, Table, TableBody, TableCell, TableCellBaseProps, TableRow } from '@mui/material'

// ** Utils Imports
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { calculateInvoiceSubtotal, calculateInvoiceTotal } from 'src/utils/invoice'

// ** Constant Imports
import { MenuProps } from 'src/constants'

const initialFormData = {
  index: 0,
  name: '',
  note: '',
  price: 0,
  quantity: 0
}

interface PickerProps {
  label?: string
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return <TextField size='small' inputRef={ref} sx={{ width: { sm: '170px', xs: '170px' } }} {...props} />
})

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))

export interface AddCardProps {
  projects: ProjectResponseDto[]
  categories: CategoryResponseDto[]
  toggleAddCategoryDrawer: () => void
  formData: CreateInvoiceFormData[]
  setFormData: (value: any) => void
  date: DateType
  setDate: (value: DateType) => void
  type: InvoiceType
  setType: (value: InvoiceType) => void
  currency: CurrencyType
  setCurrency: (value: CurrencyType) => void
  projectId: string
  setProjectId: (value: string) => void
  categoryId: string
  setCategoryId: (value: string) => void
  clientName: string
  setClientName: (value: string) => void
  uid: string
  setUid: (value: string) => void
  tax: string
  setTax: (value: string) => void
  discount: string
  setDiscount: (value: string) => void
  note: string
  setNote: (value: string) => void
  exchangeRate: string
  setExchangeRate: (value: string) => void
  projectName: string | undefined
}

const AddCard = ({
  projects,
  categories,
  toggleAddCategoryDrawer,
  formData,
  setFormData,
  date,
  setDate,
  type,
  setType,
  currency,
  setCurrency,
  projectId,
  setProjectId,
  categoryId,
  setCategoryId,
  clientName,
  setClientName,
  uid,
  setUid,
  tax,
  setTax,
  discount,
  setDiscount,
  note,
  setNote,
  exchangeRate,
  setExchangeRate,
  projectName
}: AddCardProps) => {
  // ** States
  const [count, setCount] = useState<number>(1)

  // ** Hook
  const { t } = useTranslation()
  const session = useSession()
  const { organization } = useCurrentOrganization()

  const handleChangeForm = (index: number, key: string, value: any): void => {
    setFormData((prevFormData: any[]) => {
      const newFormData = [...prevFormData]
      newFormData.forEach(formData => {
        if (formData.index === index) {
          formData[key] = value
        }
      })

      return newFormData
    })
  }

  const addItem = () => {
    setCount(count + 1)
    setFormData((prevFormData: any[]) => {
      const newFormData = [...prevFormData]

      const data: any = { ...initialFormData, index: count }
      newFormData.push(data)

      return newFormData
    })
  }

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent, i: number) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()

    setFormData((prevFormData: any[]) => {
      const newFormData = [...prevFormData]

      return newFormData.filter(item => item.index !== i)
    })
  }

  const handleAddNewCategory = () => {
    toggleAddCategoryDrawer()
  }

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item sm={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <img src='/images/pages/tree.png' alt='logo' width='30' height='30' />
                <Typography
                  variant='h6'
                  sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                >
                  {organization.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  {organization.address}
                </Typography>
                <Typography variant='body2'>{organization.phone}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Table sx={{ maxWidth: '250px' }}>
                <TableBody>
                  <TableRow sx={{ display: 'flex', alignItems: 'center' }}>
                    <MUITableCell>
                      <Typography variant='h6' sx={{ mr: { sm: 0, xs: 3 }, width: { sm: '100px', xs: '125px' } }}>
                        {t('invoice_page.add.invoice')}
                      </Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <TextField
                        rows={1}
                        placeholder='INV-F1A'
                        size='small'
                        value={uid}
                        onChange={e => setUid(e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>#</InputAdornment>
                        }}
                      />
                    </MUITableCell>
                  </TableRow>
                  <TableRow sx={{ display: 'flex', alignItems: 'center' }}>
                    <MUITableCell>
                      <Typography variant='body2' sx={{ mr: { sm: 0, xs: 3 }, width: { sm: '100px', xs: '125px' } }}>
                        {t('invoice_page.add.date')}:
                      </Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <DatePicker
                        id='date'
                        selected={date}
                        customInput={<CustomInput />}
                        onChange={(date: Date) => setDate(date)}
                      />
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container>
          <Grid item xl={12} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-start', xs: 'flex-start' } }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 3, width: '125px' }}>
                  {t('invoice_page.add.type')}:
                </Typography>
                <Select
                  size='small'
                  value={type}
                  sx={{ width: { sm: '220px', xs: '170px' } }}
                  onChange={e => {
                    setType(e.target.value as InvoiceType)
                    setCategoryId('')
                  }}
                >
                  <MenuItem value={InvoiceType.EXPENSE}>
                    <CustomChip size='small' skin='light' color='error' label='Expense' />
                  </MenuItem>
                  <MenuItem value={InvoiceType.INCOME}>
                    <CustomChip size='small' skin='light' color='success' label='Income' />
                  </MenuItem>
                </Select>
              </Box>
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  gap: { lg: '20px', xs: '10px' },
                  alignItems: { lg: 'center', xs: 'flex-end' },
                  flexDirection: { lg: 'row', xs: 'column' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 3, width: '125px' }}>
                    {t('invoice_page.add.currency')}:
                  </Typography>
                  <Select
                    size='small'
                    value={currency}
                    sx={{ width: { sm: '220px', xs: '170px' } }}
                    onChange={e => setCurrency(e.target.value as CurrencyType)}
                  >
                    <MenuItem value={CurrencyType.USD}>USD</MenuItem>
                    <MenuItem value={CurrencyType.VND}>VND</MenuItem>
                  </Select>
                </Box>
                {currency === CurrencyType.VND && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>1 USD = </Typography>
                    <TextField
                      size='small'
                      type='number'
                      placeholder='25400'
                      sx={{ width: '100px' }}
                      value={exchangeRate}
                      onChange={e => setExchangeRate(e.target.value)}
                    />
                    <Typography variant='body2'>VND</Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 3, width: '125px' }}>
                  {t('invoice_page.add.project')}:
                </Typography>
                <Select
                  size='small'
                  value={projectId}
                  sx={{ width: { sm: '220px', xs: '170px' } }}
                  onChange={e => {
                    setProjectId(e.target.value)
                    setCategoryId('')
                  }}
                  MenuProps={MenuProps}
                  disabled={projectName ? true : false}
                >
                  {projectName ? (
                    <MenuItem value={projectId} key={projectId}>
                      {projectName}
                    </MenuItem>
                  ) : (
                    projects.map(project => (
                      <MenuItem value={project.id} key={project.id}>
                        {project.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </Box>
              {projectId && categories && (
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 3, width: '125px' }}>
                    {t('invoice_page.add.category')}:
                  </Typography>
                  <Select
                    size='small'
                    value={categoryId}
                    sx={{ width: { sm: '220px', xs: '170px' } }}
                    onChange={e => setCategoryId(e.target.value)}
                    MenuProps={MenuProps}
                  >
                    <CustomSelectItem value='' onClick={handleAddNewCategory}>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}>
                        <Icon icon='mdi:plus' fontSize={20} />
                        {t('invoice_page.add.add_new_category')}
                      </Box>
                    </CustomSelectItem>
                    {categories.map(
                      category =>
                        category.type === type && (
                          <MenuItem value={category.id} key={category.id}>
                            <CustomChip size='small' skin='light' color={category.color as any} label={category.name} />
                          </MenuItem>
                        )
                    )}
                  </Select>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
              {type === InvoiceType.EXPENSE
                ? `${t('invoice_page.add.invoice_to')}:`
                : `${t('invoice_page.add.invoice_from')}:`}
            </Typography>
            <TextField
              rows={1}
              placeholder={t('invoice_page.add.client_name') as string}
              size='small'
              value={clientName}
              onChange={e => setClientName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
            <div>
              <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                {t('invoice_page.add.note')}:
              </Typography>
              <TextField
                rows={2}
                placeholder={t('invoice_page.add.note') as string}
                fullWidth
                multiline
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <RepeaterWrapper>
        <Repeater count={count}>
          {(i: number) => {
            const Tag = i === 0 ? Box : Collapse

            return (
              <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                <Grid container>
                  <RepeatingContent item xs={12}>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          {t('invoice_page.add.item')}
                        </Typography>
                        <TextField
                          rows={1}
                          fullWidth
                          placeholder={t('invoice_page.add.name') as string}
                          size='small'
                          onChange={e => handleChangeForm(i, 'name', e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          {t('invoice_page.add.note')}
                        </Typography>
                        <TextField
                          rows={1}
                          fullWidth
                          multiline
                          placeholder={t('invoice_page.add.note') as string}
                          size='small'
                          onChange={e => handleChangeForm(i, 'note', e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          {t('invoice_page.add.price')}
                        </Typography>
                        <TextField
                          fullWidth
                          size='small'
                          type='number'
                          placeholder='1000'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => handleChangeForm(i, 'price', e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography
                          variant='body2'
                          className='col-title'
                          sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                          {t('invoice_page.add.quantity')}
                        </Typography>
                        <TextField
                          fullWidth
                          size='small'
                          type='number'
                          placeholder='10'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => handleChangeForm(i, 'quantity', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <InvoiceAction>
                      <IconButton size='small' onClick={(e: SyntheticEvent) => deleteForm(e, i)}>
                        <Icon icon='mdi:close' fontSize={20} />
                      </IconButton>
                    </InvoiceAction>
                  </RepeatingContent>
                </Grid>
              </Tag>
            )
          }}
        </Repeater>

        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Button
              size='small'
              variant='contained'
              startIcon={<Icon icon='mdi:plus' fontSize={20} />}
              onClick={() => addItem()}
            >
              {t('invoice_page.add.add_item')}
            </Button>
          </Grid>
        </Grid>
      </RepeaterWrapper>

      <Divider />

      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={7} lg={8} sx={{ order: { sm: 1, xs: 2 } }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2, fontWeight: 600 }}>
                {t('invoice_page.add.sales_person')}:
              </Typography>
              <Typography variant='body2'>{session.data?.user.name}</Typography>
            </Box>

            <Typography variant='body2'>{t('invoice_page.add.thanks_for_you_business')}</Typography>
          </Grid>
          <Grid item xs={12} sm={5} lg={4} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.add.subtotal')}:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {formatCurrencyAsStandard(calculateInvoiceSubtotal(formData), Locale.EN, currency)}
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.add.discount')}:</Typography>
              <TextField
                size='small'
                type='number'
                placeholder='100'
                sx={{ width: '70px' }}
                value={discount}
                onChange={e => setDiscount(e.target.value)}
              />
            </CalcWrapper>
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.add.tax')}:</Typography>
              <TextField
                size='small'
                type='number'
                placeholder='10'
                sx={{ width: '70px' }}
                value={tax}
                onChange={e => setTax(e.target.value)}
              />
            </CalcWrapper>
            <Divider />
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.add.total')}:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {formatCurrencyAsStandard(calculateInvoiceTotal(formData, tax, discount), Locale.EN, currency)}
              </Typography>
            </CalcWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddCard
