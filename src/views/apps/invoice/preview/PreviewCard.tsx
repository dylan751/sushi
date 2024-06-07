// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { InvoiceResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Third Parties Imports
import { format } from 'date-fns'

// ** Utils Imports
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { calculateInvoiceItemTotal, calculateInvoiceSubtotal } from 'src/utils/invoice'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'
import { useCurrentOrganization } from 'src/hooks'

// ** Enums Imports
import { Locale } from 'src/enum'

interface Props {
  data: InvoiceResponseDto
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PreviewCard = ({ data }: Props) => {
  // ** Hook
  const { t } = useTranslation()
  const { organization } = useCurrentOrganization()

  if (data) {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <img src='/images/pages/tree.png' alt='logo' width='30' height='30' />
                  <Typography
                    variant='h6'
                    sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                  >
                    {themeConfig.templateName}
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
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>{t('invoice_page.preview.invoice')}</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>{`#${data.uid}`}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>{t('invoice_page.preview.date')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {format(new Date(data?.date ? new Date(data.date) : new Date()), organization?.dateFormat)}
                        </Typography>
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
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
                {t('invoice_page.preview.invoice_to')}:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {data.clientName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
              <div>
                <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
                  {t('invoice_page.preview.note')}:
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  {data.note}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('invoice_page.preview.item')}</TableCell>
                <TableCell>{t('invoice_page.preview.note')}</TableCell>
                <TableCell>{t('invoice_page.preview.price')}</TableCell>
                <TableCell>{t('invoice_page.preview.quantity')}</TableCell>
                <TableCell>{t('invoice_page.preview.total')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items?.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>{formatCurrencyAsStandard(item.price, Locale.EN, data.currency)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {formatCurrencyAsStandard(
                      calculateInvoiceItemTotal(item.price, item.quantity),
                      Locale.EN,
                      data.currency
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600 }}>
                  {t('invoice_page.preview.sales_person')}:
                </Typography>
                <Typography variant='body2'>{data.creator?.name}</Typography>
              </Box>

              <Typography variant='body2'>{t('invoice_page.preview.thanks_for_you_business')}</Typography>
            </Grid>
            <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <CalcWrapper>
                <Typography variant='body2'>{t('invoice_page.preview.subtotal')}:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {formatCurrencyAsStandard(calculateInvoiceSubtotal(data.items), Locale.EN, data.currency)}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>{t('invoice_page.preview.discount')}:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {formatCurrencyAsStandard(data.discount, Locale.EN, data.currency)}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>{t('invoice_page.preview.tax')}:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {data.tax !== null ? `${data.tax}%` : '-'}
                </Typography>
              </CalcWrapper>
              <Divider />
              <CalcWrapper>
                <Typography variant='body2'>{t('invoice_page.preview.total')}:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {formatCurrencyAsStandard(data.total, Locale.EN, data.currency)}
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
