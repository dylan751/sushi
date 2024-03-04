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
import { InvoiceLayoutProps } from 'src/types/apps/invoiceTypes'
import { AppDispatch, RootState } from 'src/store'
import { InvoiceResponseDto, InvoiceType, UpdateInvoiceRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import EditCard from './EditCard'
import EditActions from './EditActions'
import AddPaymentDrawer from 'src/views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'

// ** Utils Imports
import { getOrgUniqueName } from 'src/utils/organization'

// ** Third Party Imports
import { format } from 'date-fns'

const InvoiceEdit = ({ id }: InvoiceLayoutProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)

  // ** Utils
  const uniqueName = getOrgUniqueName()

  useEffect(() => {
    dispatch(fetchAnInvoice(parseInt(id!)))
  }, [dispatch, id])

  // ** States
  const [name, setName] = useState<string>((invoiceStore.invoice as InvoiceResponseDto).name)
  const [note, setNote] = useState<string>((invoiceStore.invoice as InvoiceResponseDto).note)
  const [type, setType] = useState<InvoiceType>((invoiceStore.invoice as InvoiceResponseDto).type)
  const [amount, setAmount] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).amount
      ? (invoiceStore.invoice as InvoiceResponseDto).amount.toString()
      : ''
  )
  const [date, setDate] = useState<Date>(
    (invoiceStore.invoice as InvoiceResponseDto).date
      ? new Date((invoiceStore.invoice as InvoiceResponseDto).date)
      : new Date()
  )

  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const onSubmit = () => {
    const updateInvoiceRequest: UpdateInvoiceRequestDto = {
      name,
      note,
      type,
      amount: parseInt(amount),
      date: format(date, 'yyyy-MM-dd')
    }

    // Call api
    dispatch(updateInvoice({ ...updateInvoiceRequest, invoiceId: parseInt(id!) }))
  }

  if (invoiceStore.invoice) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <EditCard
              data={invoiceStore.invoice as InvoiceResponseDto}
              name={name}
              setName={setName}
              note={note}
              setNote={setNote}
              type={type}
              setType={setType}
              amount={amount}
              setAmount={setAmount}
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
