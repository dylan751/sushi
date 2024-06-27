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
import { fetchAnInvoice } from 'src/store/apps/organization/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { InvoiceResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import PreviewCard from 'src/views/apps/invoice/preview/PreviewCard'
import PreviewActions from 'src/views/apps/invoice/preview/PreviewActions'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'

// ** Utils Imports
import { getInvoiceListUrl } from 'src/utils/router/invoice'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

export interface InvoicePreviewProps {
  id: string
}

const InvoicePreview = ({ id }: InvoicePreviewProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  const { organizationId } = useCurrentOrganization()

  useEffect(() => {
    dispatch(fetchAnInvoice({ organizationId, id: parseInt(id!) }))
  }, [dispatch, id, organizationId])

  // ** State
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)

  if (invoiceStore.invoice) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={8} md={7} xs={12}>
            <PreviewCard data={invoiceStore.invoice as InvoiceResponseDto} />
          </Grid>
          <Grid item xl={4} md={5} xs={12}>
            <PreviewActions id={id} toggleSendInvoiceDrawer={toggleSendInvoiceDrawer} />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
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
