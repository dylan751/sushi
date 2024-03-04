// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types Imports
import { InvoiceResponseDto, InvoiceType } from 'src/__generated__/AccountifyAPI'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

interface PickerProps {
  label?: string
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return <TextField size='small' inputRef={ref} {...props} sx={{ width: { sm: '250px', xs: '170px' } }} />
})

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

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 0),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

export interface EditCardProps {
  data: InvoiceResponseDto
  name: string
  setName: (value: string) => void
  note: string
  setNote: (value: string) => void
  type: InvoiceType
  setType: (value: InvoiceType) => void
  amount: string
  setAmount: (value: string) => void
  date: Date
  setDate: (value: Date) => void
}

const EditCard = ({
  data,
  name,
  setName,
  note,
  setNote,
  type,
  setType,
  amount,
  setAmount,
  date,
  setDate
}: EditCardProps) => {
  // ** States
  const [count, setCount] = useState<number>(1)

  useEffect(() => {
    if (data) {
      setName(data.name)
      setNote(data.note)
      setType(data.type)
      setAmount(data.amount.toString())
      setDate(new Date(data.date))
    }
  }, [data, setName, setNote, setType, setAmount, setDate])

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  if (data) {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <svg
                    width={30}
                    height={25}
                    version='1.1'
                    viewBox='0 0 30 23'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                      <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                        <g id='logo' transform='translate(95.000000, 50.000000)'>
                          <path
                            id='Combined-Shape'
                            fill={theme.palette.primary.main}
                            d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                            transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                            transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.15'
                            fill={theme.palette.common.white}
                            d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.35'
                            fill={theme.palette.common.white}
                            transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                            d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <Typography
                    variant='h6'
                    sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                  >
                    {themeConfig.templateName}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ mr: 2, width: '105px' }}>
                    Invoice
                  </Typography>
                  <TextField
                    size='small'
                    value={data.id}
                    sx={{ width: { sm: '250px', xs: '170px' } }}
                    InputProps={{
                      disabled: true,
                      startAdornment: <InputAdornment position='start'>#</InputAdornment>
                    }}
                  />
                </Box>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 3, width: '100px' }}>
                    Date:
                  </Typography>
                  <DatePicker
                    id='date'
                    selected={date}
                    showDisabledMonthNavigation
                    customInput={<CustomInput />}
                    onChange={(date: Date) => setDate(date)}
                  />
                </Box>
              </Box>
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
                        <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                          <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                          >
                            Item
                          </Typography>
                          <TextField
                            rows={1}
                            fullWidth
                            placeholder='Name'
                            size='small'
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                          <TextField
                            rows={2}
                            fullWidth
                            multiline
                            placeholder='Note ...'
                            size='small'
                            sx={{ mt: 3.5 }}
                            value={note}
                            onChange={e => setNote(e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                          <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                          >
                            Type
                          </Typography>
                          <Select
                            fullWidth
                            size='small'
                            defaultValue='expense'
                            value={type}
                            onChange={e => {
                              setType(e.target.value as InvoiceType)
                            }}
                          >
                            <MenuItem value='expense'>Expense</MenuItem>
                            <MenuItem value='income'>Income</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                          <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                          >
                            Price
                          </Typography>
                          <TextField
                            size='small'
                            type='number'
                            placeholder='1000'
                            InputProps={{ inputProps: { min: 0 } }}
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                      <InvoiceAction>
                        <IconButton size='small' onClick={deleteForm}>
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
                onClick={() => setCount(count + 1)}
                startIcon={<Icon icon='mdi:plus' fontSize={20} />}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </RepeaterWrapper>
      </Card>
    )
  } else {
    return null
  }
}

export default EditCard
