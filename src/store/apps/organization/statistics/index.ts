// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { Api, OrganizationStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  date?: string
}

// ** Fetch Organization Statisics
export const fetchStatistics = createAsyncThunk(
  'appOrganizationStatistics/fetchStatistics',
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
      }).internal.getStatisticsForOrganization(organizationId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appOrganizationStatisticsSlice = createSlice({
  name: 'appOrganizationStatistics',
  initialState: {
    statistics: {} as OrganizationStatisticsResponseDto
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload || ({} as OrganizationStatisticsResponseDto)
    })
  }
})

export default appOrganizationStatisticsSlice.reducer
