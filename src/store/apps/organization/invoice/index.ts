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
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  fromDate?: string
  toDate?: string
  uid?: string
  type?: string
  projectId?: number
  status?: string
  categoryId?: number
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Invoices
export const fetchInvoice = createAsyncThunk(
  'appInvoices/fetchInvoice',
  async (params: DataParams & { organizationId: number }) => {
    const storedToken = getAccessToken()
    const { organizationId, ...restParams } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getInvoiceListForOrganization(organizationId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Fetch Invoices for a project
export const fetchInvoiceForProject = createAsyncThunk(
  'appInvoices/fetchInvoiceForProject',
  async (params: DataParams & { organizationId: number; projectId: number }) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, ...restParams } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getInvoiceListForAProjectOfOrganization(organizationId, projectId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Fetch 1 invoice
export const fetchAnInvoice = createAsyncThunk(
  'appInvoices/fetchAnInvoice',
  async (params: { organizationId: number; id: number }) => {
    const storedToken = getAccessToken()
    const { organizationId, id } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getInvoiceByIdForAnOrg(organizationId, id)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Add Invoice
export const addInvoice = createAsyncThunk(
  'appInvoices/addInvoice',
  async (data: CreateInvoiceRequestDto & { organizationId: number; projectId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createInvoicesForAProjectOfOrganization(organizationId, projectId, resData)

      dispatch(fetchInvoice({ organizationId }))
      dispatch(fetchInvoiceForProject({ organizationId, projectId }))
      toast.success('Add invoice succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Update Invoice
export const updateInvoice = createAsyncThunk(
  'appInvoices/updateInvoice',
  async (
    data: UpdateInvoiceRequestDto & { organizationId: number; projectId: number; invoiceId: number },
    { dispatch }: Redux
  ) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateAnInvoiceForAProjectOfOrganization(organizationId, projectId, resData.invoiceId, resData)

      dispatch(fetchInvoice({ organizationId }))
      dispatch(fetchAnInvoice({ organizationId, id: resData.invoiceId }))
      dispatch(fetchInvoiceForProject({ organizationId, projectId }))
      toast.success('Update invoice succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Delete Invoice
export const deleteInvoice = createAsyncThunk(
  'appInvoices/deleteInvoice',
  async (params: { organizationId: number; projectId?: number; invoiceId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, invoiceId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAnInvoiceForAnOrganization(organizationId, invoiceId)

      dispatch(fetchInvoice({ organizationId }))

      if (params.projectId) {
        dispatch(fetchInvoiceForProject({ organizationId, projectId: params.projectId }))
      }
      toast.success('Delete invoice succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const appInvoicesSlice = createSlice({
  name: 'appInvoices',
  initialState: {
    invoices: [] as InvoiceResponseDto[],
    totalInvoices: 0,
    paramsInvoices: {},

    projectInvoices: [] as InvoiceResponseDto[],
    totalProjectInvoices: 0,
    paramsProjectInvoices: {},

    invoice: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInvoice.fulfilled, (state, action) => {
      state.invoices = action.payload?.invoices || []
      state.totalInvoices = action.payload?.metadata.total || 0
      state.paramsInvoices = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchInvoiceForProject.fulfilled, (state, action) => {
        state.projectInvoices = action.payload?.invoices || []
        state.totalProjectInvoices = action.payload?.metadata.total || 0
        state.paramsProjectInvoices = action.payload?.metadata.params || {}
      }),
      builder.addCase(fetchAnInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload || {}
      })
  }
})

export default appInvoicesSlice.reducer
