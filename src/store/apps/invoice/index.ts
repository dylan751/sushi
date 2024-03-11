// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import {
  Api,
  CreateInvoiceRequestDto,
  InvoiceResponseDto,
  UpdateInvoiceRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  query?: string
  fromDate?: string
  toDate?: string
  type?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Invoices
export const fetchInvoice = createAsyncThunk('appInvoices/fetchInvoice', async (params: DataParams) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getInvoiceListForOrganization(organizationId!, params)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Fetch 1 invoice
export const fetchAnInvoice = createAsyncThunk('appInvoices/fetchAnInvoice', async (id: number) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getInvoiceByIdForAnOrg(organizationId!, id)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Add Invoice
export const addInvoice = createAsyncThunk(
  'appInvoices/addInvoice',
  async (data: CreateInvoiceRequestDto, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createInvoicesForAnOrganization(organizationId, data)

      dispatch(fetchInvoice({ query: '' }))
      toast.success('Add invoice succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update Invoice
export const updateInvoice = createAsyncThunk(
  'appInvoices/updateInvoice',
  async (data: UpdateInvoiceRequestDto & { invoiceId: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateAnInvoiceForAnOrganization(organizationId, data.invoiceId, data)

      dispatch(fetchInvoice({ query: '' }))
      toast.success('Update invoice succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Delete Invoice
export const deleteInvoice = createAsyncThunk(
  'appInvoices/deleteInvoice',
  async (invoiceId: number, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAnInvoiceForAnOrganization(organizationId, invoiceId)

      dispatch(fetchInvoice({ query: '' }))
      toast.success('Delete invoice succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appInvoicesSlice = createSlice({
  name: 'appInvoices',
  initialState: {
    data: [] as InvoiceResponseDto[],
    total: 0,
    params: {},

    invoice: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInvoice.fulfilled, (state, action) => {
      state.data = action.payload?.invoices || []
      state.total = action.payload?.metadata.total || 0
      state.params = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchAnInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload || {}
      })
  }
})

export default appInvoicesSlice.reducer
