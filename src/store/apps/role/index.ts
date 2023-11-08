// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

// ** Fetch Invoices
export const fetchData = createAsyncThunk('appRoles/fetchData', async () => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/internal/api/v1/organizations/${organizationId}/roles`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }
  )

  return response.data
})

export const appRolesSlice = createSlice({
  name: 'appRoles',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.roles
    })
  }
})

export default appRolesSlice.reducer
