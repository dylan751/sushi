// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import { Api, CreateBudgetRequestDto, BudgetResponseDto, UpdateBudgetRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  categoryId?: number
  fromAmount?: number
  toAmount?: number
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Budgets
export const fetchBudget = createAsyncThunk(
  'appBudgets/fetchBudget',
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
      }).internal.getBudgetListForProjectOfOrganization(organizationId, projectId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Fetch 1 Budget
export const fetchABudget = createAsyncThunk(
  'appBudgets/fetchABudget',
  async (params: { organizationId: number; projectId: number; id: number }) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, id } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getProjectsBudgetByIdForAnOrg(organizationId, projectId, id)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Add Budget
export const addBudget = createAsyncThunk(
  'appBudgets/addBudget',
  async (data: CreateBudgetRequestDto & { organizationId: number; projectId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createProjectsBudgetForAnOrganization(organizationId, projectId, resData)

      dispatch(fetchBudget({ organizationId, projectId }))
      toast.success('Add budget succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update Budget
export const updateBudget = createAsyncThunk(
  'appBudgets/updateBudget',
  async (
    data: UpdateBudgetRequestDto & { organizationId: number; projectId: number; budgetId: number },
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
      }).internal.updateABudgetForAProjectOfOrganization(organizationId, projectId, resData.budgetId, resData)

      dispatch(fetchBudget({ organizationId, projectId }))
      toast.success('Update budget succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Delete Budget
export const deleteBudget = createAsyncThunk(
  'appBudgets/deleteBudget',
  async (params: { organizationId: number; projectId: number; budgetId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, budgetId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAProjectsBudgetForAnOrganization(organizationId, projectId, budgetId)

      dispatch(fetchBudget({ organizationId, projectId }))
      toast.success('Delete budget succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appBudgetsSlice = createSlice({
  name: 'appBudgets',
  initialState: {
    budgets: [] as BudgetResponseDto[],
    total: 0,
    params: {},

    budget: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBudget.fulfilled, (state, action) => {
      state.budgets = action.payload?.budgets || []
      state.total = action.payload?.metadata.total || 0
      state.params = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchABudget.fulfilled, (state, action) => {
        state.budget = action.payload || {}
      })
  }
})

export default appBudgetsSlice.reducer
