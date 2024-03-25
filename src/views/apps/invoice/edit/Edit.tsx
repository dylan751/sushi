// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAnInvoice, updateInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import {
  CurrencyType,
  InvoiceResponseDto,
  UpdateInvoiceItemRequest,
  UpdateInvoiceRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import EditCard from './EditCard'
import EditActions from './EditActions'
import AddPaymentDrawer from 'src/views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'

// ** Utils Imports
import { getInvoiceListUrl, getInvoicePreviewUrl } from 'src/utils/router/invoice'

// ** Third Party Imports
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export interface InvoiceEditProps {
  id: string
}

export type UpdateInvoiceFormData = UpdateInvoiceItemRequest & { id: number; index: number }

const InvoiceEdit = ({ id }: InvoiceEditProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAnInvoice(parseInt(id!)))
  }, [dispatch, id])

  // ** States
  const [date, setDate] = useState<Date>(
    (invoiceStore.invoice as InvoiceResponseDto).date
      ? new Date((invoiceStore.invoice as InvoiceResponseDto).date)
      : new Date()
  )
  const [currency, setCurrency] = useState<CurrencyType>((invoiceStore.invoice as InvoiceResponseDto).currency)
  const [formData, setFormData] = useState<UpdateInvoiceFormData[]>([])

  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const isSubmitDisabled = (): boolean => {
    let isDisabled = false
    formData?.map(data => {
      if (!data.name || !data.type || !data.price || !data.quantity) {
        isDisabled = true
      }
    })

    return isDisabled
  }

  const onSubmit = () => {
    // Validation
    let isError = false
    formData.map(data => {
      if (!data.name || !data.type || !data.price || !data.quantity) {
        toast.error('Please fill out all the fields of all items')
        isError = true

        return
      }
    })
    if (isError) {
      return
    }

    // Update invoice api call
    const updateInvoiceRequest: UpdateInvoiceRequestDto = {
      items: formData.map(data => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index, id, ...resData } = data

        return { ...resData }
      }),
      date: format(date as Date, 'yyyy-MM-dd'),
      currency
    }

    // Call api
    dispatch(updateInvoice({ ...updateInvoiceRequest, invoiceId: parseInt(id!) }))
    router.replace(getInvoicePreviewUrl(id))
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
              currency={currency}
              setCurrency={setCurrency}
            />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <EditActions
              id={id}
              onSubmit={onSubmit}
              isSubmitDisabled={isSubmitDisabled}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
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

export default InvoiceEdit
