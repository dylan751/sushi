// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import {
  Api,
  CreateCategoryRequestDto,
  CategoryResponseDto,
  UpdateCategoryRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  query?: string
  type?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Categories
export const fetchCategory = createAsyncThunk(
  'appCategories/fetchCategory',
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
      }).internal.getCategoryListForProjectOfOrganization(organizationId, projectId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Fetch 1 Category
export const fetchACategory = createAsyncThunk(
  'appCategories/fetchACategory',
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
      }).internal.getProjectsCategoryByIdForAnOrg(organizationId, projectId, id)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Add Category
export const addCategory = createAsyncThunk(
  'appCategories/addCategory',
  async (data: CreateCategoryRequestDto & { organizationId: number; projectId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createProjectsCategoryForAnOrganization(organizationId, projectId, resData)

      dispatch(fetchCategory({ organizationId, projectId, query: '' }))
      toast.success('Add category succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update Category
export const updateCategory = createAsyncThunk(
  'appCategories/updateCategory',
  async (
    data: UpdateCategoryRequestDto & { organizationId: number; projectId: number; categoryId: number },
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
      }).internal.updateACategoryForAProjectOfOrganization(organizationId, projectId, resData.categoryId, resData)

      dispatch(fetchCategory({ organizationId, projectId, query: '' }))
      toast.success('Update category succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Delete Category
export const deleteCategory = createAsyncThunk(
  'appCategories/deleteCategory',
  async (params: { organizationId: number; projectId: number; categoryId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId, categoryId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAProjectsCategoryForAnOrganization(organizationId, projectId, categoryId)

      dispatch(fetchCategory({ organizationId, projectId, query: '' }))
      toast.success('Delete category succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    categories: [] as CategoryResponseDto[],
    total: 0,
    params: {},

    category: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload?.categories || []
      state.total = action.payload?.metadata.total || 0
      state.params = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchACategory.fulfilled, (state, action) => {
        state.category = action.payload || {}
      })
  }
})

export default appCategoriesSlice.reducer
