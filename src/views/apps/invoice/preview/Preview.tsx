// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAnInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { InvoiceResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import PreviewCard from 'src/views/apps/invoice/preview/PreviewCard'
import PreviewActions from 'src/views/apps/invoice/preview/PreviewActions'
import AddPaymentDrawer from 'src/views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'

// ** Utils Imports
import { getInvoiceListUrl } from 'src/utils/router/invoice'

export interface InvoicePreviewProps {
  id: string
}

const InvoicePreview = ({ id }: InvoicePreviewProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  useEffect(() => {
    dispatch(fetchAnInvoice(parseInt(id!)))
  }, [dispatch, id])

  // ** State
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  if (invoiceStore.invoice) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={invoiceStore.invoice as InvoiceResponseDto} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={id}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
            />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
      </>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link href={getInvoiceListUrl()}>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

export default InvoicePreview
