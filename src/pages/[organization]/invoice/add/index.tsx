// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components Imports
import AddCard from 'src/views/apps/invoice/add/AddCard'
import AddActions from 'src/views/apps/invoice/add/AddActions'
import AddCategoryDrawer from 'src/views/apps/project/category/list/AddCategoryDrawer'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { addInvoice } from 'src/store/apps/organization/invoice'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import {
  CreateInvoiceItemRequest,
  CreateInvoiceRequestDto,
  CurrencyType,
  InvoiceType
} from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { format } from 'date-fns'

// ** Utils Imports
import { getInvoiceListUrl } from 'src/utils/router/invoice'

// ** Enum Imports
import { BankOptions } from 'src/enum'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { fetchProject } from 'src/store/apps/organization/project'
import { fetchCategory } from 'src/store/apps/organization/project/category'

export type CreateInvoiceFormData = CreateInvoiceItemRequest & { index: number }

const initialFormData = {
  index: 0,
  name: '',
  note: '',
  price: 0,
  quantity: 0
}

const InvoiceAdd = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const projectStore = useSelector((state: RootState) => state.project)
  const categoryStore = useSelector((state: RootState) => state.category)
  const { organizationId } = useCurrentOrganization()

  // ** States
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false)
  const [date, setDate] = useState<DateType>(new Date())
  const [type, setType] = useState<InvoiceType>(InvoiceType.EXPENSE)
  const [currency, setCurrency] = useState<CurrencyType>(CurrencyType.USD)
  const [projectId, setProjectId] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')
  const [uid, setUid] = useState<string>('')
  const [tax, setTax] = useState<string>('')
  const [discount, setDiscount] = useState<string>('0')
  const [note, setNote] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<string>('')
  const [formData, setFormData] = useState<CreateInvoiceFormData[]>([initialFormData])

  const [source, setSource] = useState<BankOptions>(BankOptions.BIDV)

  const toggleAddCategoryDrawer = () => setAddCategoryOpen(!addCategoryOpen)

  useEffect(() => {
    // Fetch organization's projects
    dispatch(fetchProject({ organizationId }))

    if (projectId) {
      // Fetch organization's projects's categories
      dispatch(fetchCategory({ organizationId, projectId: parseInt(projectId) }))
    }
  }, [dispatch, organizationId, projectId])

  const isSubmitDisabled = (): boolean => {
    let isDisabled = false
    formData.map(data => {
      if (!data.name || !data.price || !data.quantity) {
        isDisabled = true
      }
    })

    if (!projectId || !clientName || !uid || (currency === CurrencyType.VND && !exchangeRate)) {
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

    if (!projectId || !clientName || !uid) {
      isError = true
    }

    if (isError) {
      return
    }

    // Create invoice api call
    const createInvoiceRequest: CreateInvoiceRequestDto = {
      items: formData.map(data => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index, ...resData } = data

        return { ...resData }
      }),
      date: format(date as Date, 'yyyy-MM-dd'),
      type,
      currency,
      clientName,
      categoryId: parseInt(categoryId),
      uid,
      tax: parseInt(tax),
      discount: parseInt(discount) ?? 0,
      note,
      exchangeRate: parseInt(exchangeRate)
    }

    // Call api
    setFormData([initialFormData])
    dispatch(addInvoice({ organizationId, projectId: parseInt(projectId), ...createInvoiceRequest }))
    router.replace(getInvoiceListUrl())
  }

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={8} md={7} xs={12}>
          <AddCard
            projects={projectStore.projects}
            categories={categoryStore.categories}
            toggleAddCategoryDrawer={toggleAddCategoryDrawer}
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
            exchangeRate={exchangeRate}
            note={note}
            setNote={setNote}
            setExchangeRate={setExchangeRate}
          />
        </Grid>
        <Grid item xl={4} md={5} xs={12}>
          <AddActions source={source} setSource={setSource} onSubmit={onSubmit} isSubmitDisabled={isSubmitDisabled} />
        </Grid>
      </Grid>
      <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} projectId={parseInt(projectId)} />
    </DatePickerWrapper>
  )
}

InvoiceAdd.acl = {
  action: 'create',
  subject: 'invoice'
}

export default InvoiceAdd
