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
import { fetchAnInvoice, updateInvoice } from 'src/store/apps/organization/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { BIDVResponseType } from '../../exchange-rates/BIDV'
import {
  CurrencyType,
  InvoiceResponseDto,
  InvoiceType,
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
import axios from 'axios'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { fetchCategory } from 'src/store/apps/organization/project/category'

export interface InvoiceEditProps {
  id: string
}

export type UpdateInvoiceFormData = UpdateInvoiceItemRequest & { id: number; index: number }

const InvoiceEdit = ({ id }: InvoiceEditProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const invoiceStore = useSelector((state: RootState) => state.invoice)
  const categoryStore = useSelector((state: RootState) => state.category)
  const router = useRouter()

  const { organizationId } = useCurrentOrganization()

  // ** States
  const [date, setDate] = useState<Date>(
    (invoiceStore.invoice as InvoiceResponseDto).date
      ? new Date((invoiceStore.invoice as InvoiceResponseDto).date)
      : new Date()
  )
  const [type, setType] = useState<InvoiceType>((invoiceStore.invoice as InvoiceResponseDto).type || '')
  const [currency, setCurrency] = useState<CurrencyType>((invoiceStore.invoice as InvoiceResponseDto).currency || '')
  const [clientName, setClientName] = useState<string>((invoiceStore.invoice as InvoiceResponseDto).clientName || '')
  const [uid, setUid] = useState<string>((invoiceStore.invoice as InvoiceResponseDto).uid || '')
  const [tax, setTax] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).tax ? (invoiceStore.invoice as InvoiceResponseDto).tax.toString() : ''
  )
  const [discount, setDiscount] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).discount
      ? (invoiceStore.invoice as InvoiceResponseDto).discount.toString()
      : '0'
  )
  const [note, setNote] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).note
      ? (invoiceStore.invoice as InvoiceResponseDto).note.toString()
      : ''
  )
  const [exchangeRate, setExchangeRate] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).exchangeRate
      ? (invoiceStore.invoice as InvoiceResponseDto).exchangeRate.toString()
      : ''
  )
  const [projectId, setProjectId] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).project?.id.toString() || ''
  )
  const [projectName, setProjectName] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).project?.name || ''
  )
  const [categoryId, setCategoryId] = useState<string>(
    (invoiceStore.invoice as InvoiceResponseDto).category?.id.toString() || ''
  )
  const [formData, setFormData] = useState<UpdateInvoiceFormData[]>([])

  const [exchangeRates, setExchangeRates] = useState<BIDVResponseType>()

  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  useEffect(() => {
    dispatch(fetchAnInvoice({ organizationId, id: parseInt(id!) }))
  }, [dispatch, id, organizationId])

  useEffect(() => {
    // Fetch invoice's project's categories
    if ((invoiceStore.invoice as InvoiceResponseDto).project?.id) {
      dispatch(fetchCategory({ organizationId, projectId: (invoiceStore.invoice as InvoiceResponseDto).project.id }))
    }
  }, [dispatch, id, organizationId, invoiceStore.invoice])

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const response = await axios.get('https://bidv.com.vn/ServicesBIDV/ExchangeDetailServlet')
        setExchangeRates(response.data)
      } catch (error) {
        toast.error('Error while fetching exchange rates!')
      }
    }

    getExchangeRates()
  }, [])

  const isSubmitDisabled = (): boolean => {
    let isDisabled = false
    formData?.map(data => {
      if (!data.name || !data.price || !data.quantity) {
        isDisabled = true
      }
    })

    if (!projectId || (currency === CurrencyType.VND && !exchangeRate)) {
      isDisabled = true
    }

    return isDisabled
  }

  const onSubmit = () => {
    // Validation
    let isError = false
    formData.map(data => {
      if (!data.name || !data.price || !data.quantity) {
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
      type,
      currency,
      clientName,
      uid,
      categoryId: parseInt(categoryId),
      tax: parseInt(tax),
      discount: parseInt(discount) ?? 0,
      note,
      exchangeRate: parseInt(exchangeRate)
    }

    // Call api
    dispatch(
      updateInvoice({
        ...updateInvoiceRequest,
        projectId: parseInt(projectId),
        invoiceId: parseInt(id!),
        organizationId
      })
    )
    router.replace(getInvoicePreviewUrl(id))
  }

  if (invoiceStore.invoice) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={8} md={7} xs={12}>
            <EditCard
              categories={categoryStore.categories}
              data={invoiceStore.invoice as InvoiceResponseDto}
              formData={formData}
              setFormData={setFormData}
              date={date}
              setDate={setDate}
              type={type}
              setType={setType}
              currency={currency}
              setCurrency={setCurrency}
              projectId={projectId}
              setProjectId={setProjectId}
              projectName={projectName}
              setProjectName={setProjectName}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              clientName={clientName}
              setClientName={setClientName}
              uid={uid}
              setUid={setUid}
              tax={tax}
              setTax={setTax}
              discount={discount}
              setDiscount={setDiscount}
              note={note}
              setNote={setNote}
              exchangeRate={exchangeRate}
              setExchangeRate={setExchangeRate}
            />
          </Grid>
          <Grid item xl={4} md={5} xs={12}>
            <EditActions
              id={id}
              onSubmit={onSubmit}
              isSubmitDisabled={isSubmitDisabled}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              exchangeRates={exchangeRates}
            />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer
          open={addPaymentOpen}
          toggle={toggleAddPaymentDrawer}
          data={invoiceStore.invoice as InvoiceResponseDto}
        />
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
