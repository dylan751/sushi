// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
import { Api, CaslPermission } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Fetch User permissions
export const fetchPermissions = createAsyncThunk('authPermissions/fetchPermissions', async (organizationId: number) => {
  const storedToken = getAccessToken()

  if (organizationId) {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getOrganizationUsersPermissions(organizationId)

    return response.data
  }
})

export const authPermissionsSlice = createSlice({
  name: 'authPermissions',
  initialState: {
    permissions: [] as CaslPermission[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload?.permissions || []
    })
  }
})

export default authPermissionsSlice.reducer
