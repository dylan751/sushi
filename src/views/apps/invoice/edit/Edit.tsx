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
import { fetchAnInvoice, updateInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { InvoiceResponseDto, UpdateInvoiceRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import EditCard from './EditCard'
import EditActions from './EditActions'
import AddPaymentDrawer from 'src/views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'

// ** Utils Imports
import { getOrgUniqueName } from 'src/utils/organization'

// ** Third Party Imports
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export interface InvoiceEditProps {
  id: string
}

const InvoiceEdit = ({ id }: InvoiceEditProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  // ** Utils
  const uniqueName = getOrgUniqueName()

  useEffect(() => {
    dispatch(fetchAnInvoice(parseInt(id!)))
  }, [dispatch, id])

  // ** States
  const [date, setDate] = useState<Date>(
    (invoiceStore.invoice as InvoiceResponseDto).date
      ? new Date((invoiceStore.invoice as InvoiceResponseDto).date)
      : new Date()
  )
  const [formData, setFormData] = useState<any[]>([])

  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const onSubmit = () => {
    // Validation
    let isError = false
    formData.map(data => {
      if (!data.name || !data.type || !data.price) {
        toast.error('Please fill out all the fields of all items')
        isError = true

        return
      }
    })
    if (isError) {
      return
    }

    // Create invoice api call
    const updateInvoiceRequest: UpdateInvoiceRequestDto = {
      items: formData.map(data => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index, id, price, ...resData } = data

        return { price: parseInt(price), ...resData }
      }),
      date: format(date as Date, 'yyyy-MM-dd')
    }

    console.log('updateInvoiceRequest', updateInvoiceRequest)

    // // Call api
    // dispatch(updateInvoice({ ...updateInvoiceRequest, invoiceId: parseInt(id!) }))
  }

  if (invoiceStore.invoice) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <EditCard
              data={invoiceStore.invoice as InvoiceResponseDto}
              formData={formData}
              setFormData={setFormData}
              date={date}
              setDate={setDate}
            />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <EditActions id={id} onSubmit={onSubmit} toggleAddPaymentDrawer={toggleAddPaymentDrawer} />
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
            <Link href={`/${uniqueName}/invoice/list`}>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

export default InvoiceEdit
