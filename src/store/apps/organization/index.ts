// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import { Api, OrganizationResponseDto, UpdateOrganizationRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch 1 Organization
export const fetchAnOrganization = createAsyncThunk(
  'appOrganizations/fetchAnOrganization',
  async (params: { organizationId: number }) => {
    const storedToken = getAccessToken()
    const { organizationId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getOrganization(organizationId)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Update Organization
export const updateOrganization = createAsyncThunk(
  'appOrganizations/updateOrganization',
  async (data: UpdateOrganizationRequestDto & { organizationId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateOrganization(organizationId, resData)

      dispatch(fetchAnOrganization({ organizationId }))
      toast.success('Update category succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Delete Organization
export const deleteOrganization = createAsyncThunk(
  'appOrganizations/deleteOrganization',
  async (params: { organizationId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAnOrganization(organizationId)

      dispatch(fetchAnOrganization({ organizationId }))
      toast.success('Delete category succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const appCategoriesSlice = createSlice({
  name: 'appOrganizations',
  initialState: {
    organization: {} as OrganizationResponseDto
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAnOrganization.fulfilled, (state, action) => {
      state.organization = action.payload || ({} as OrganizationResponseDto)
    })
  }
})

export default appCategoriesSlice.reducer
