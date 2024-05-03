// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { Api, ProjectStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  date?: string
}

// ** Fetch Statisics
export const fetchStatistics = createAsyncThunk(
  'appStatistics/fetchStatistics',
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
      }).internal.getStatisticsForProjectOfOrganization(organizationId, projectId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appStatisticsSlice = createSlice({
  name: 'appStatistics',
  initialState: {
    statistics: {} as ProjectStatisticsResponseDto
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload || ({} as ProjectStatisticsResponseDto)
    })
  }
})

export default appStatisticsSlice.reducer
