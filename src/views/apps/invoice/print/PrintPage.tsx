// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'

// ** Third Parties Imports
import { format } from 'date-fns'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAnInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { InvoiceResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Utils Imports
import { getInvoiceListUrl } from 'src/utils/router/invoice'
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { calculateInvoiceItemTotal, calculateInvoiceSubtotal } from 'src/utils/invoice'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'
import { useCurrentOrganization } from 'src/hooks'

// ** Enums Imports
import { Locale } from 'src/enum'

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

export interface InvoicePrintProps {
  id: string
}

const InvoicePrint = ({ id }: InvoicePrintProps) => {
  // ** Hooks
  const { t } = useTranslation()
  const { organization, organizationId } = useCurrentOrganization()

  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 100)
  }, [])

  useEffect(() => {
    dispatch(fetchAnInvoice({ organizationId, id: parseInt(id!) }))
  }, [dispatch, id, organizationId])

  if (invoiceStore.invoice) {
    const invoice = invoiceStore.invoice as InvoiceResponseDto

    return (
      <Box sx={{ p: 12, pb: 6, width: '50%', margin: 'auto' }}>
        <Grid container>
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
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
              <div>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  {organization.address}
                </Typography>
                <Typography variant='body2'>{organization.phone}</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {`${t('invoice_page.print.invoice')} #${invoice.uid}`}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ mr: 3 }}>
                  {t('invoice_page.print.date')}:
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {format(new Date(invoice?.date ? new Date(invoice.date) : new Date()), 'dd MMM yyyy')}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container>
          <Grid item xs={7} sm={8} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
              {t('invoice_page.preview.invoice_to')}:
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {invoice.clientName}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important' }} />

        <Table sx={{ mb: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('invoice_page.print.item')}</TableCell>
              <TableCell>{t('invoice_page.print.note')}</TableCell>
              <TableCell>{t('invoice_page.print.price')}</TableCell>
              <TableCell>{t('invoice_page.print.quantity')}</TableCell>
              <TableCell>{t('invoice_page.print.total')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.items?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>{formatCurrencyAsStandard(item.price, Locale.EN, invoice.currency)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {formatCurrencyAsStandard(
                    calculateInvoiceItemTotal(item.price, item.quantity),
                    Locale.EN,
                    invoice.currency
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Grid container>
          <Grid item xs={8} sm={7} lg={9}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2, fontWeight: 600 }}>
                {t('invoice_page.print.sales_person')}:
              </Typography>
              <Typography variant='body2'>{invoice.creator?.name}</Typography>
            </Box>

            <Typography variant='body2'>{t('invoice_page.print.thanks_for_you_business')}</Typography>
          </Grid>
          <Grid item xs={4} sm={5} lg={3}>
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.print.subtotal')}:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {formatCurrencyAsStandard(calculateInvoiceSubtotal(invoice.items), Locale.EN, invoice.currency)}
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.print.discount')}:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {formatCurrencyAsStandard(0, Locale.EN, invoice.currency)}
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.print.tax')}:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {invoice.tax !== null ? `${invoice.tax}%` : '-'}
              </Typography>
            </CalcWrapper>
            <Divider />
            <CalcWrapper>
              <Typography variant='body2'>{t('invoice_page.print.total')}:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {formatCurrencyAsStandard(invoice.total, Locale.EN, invoice.currency)}
              </Typography>
            </CalcWrapper>
          </Grid>
        </Grid>
      </Box>
    )
  } else {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Alert severity='error'>
              Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
              <Link href={getInvoiceListUrl()}>Invoice List</Link>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default InvoicePrint
