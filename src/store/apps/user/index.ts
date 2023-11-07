// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

interface DataParams {
  query: string
  role: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const organizationId = JSON.parse(window.localStorage.getItem('organization')!).id
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/internal/api/v1/organizations/${organizationId}/users`,
    {
      params,
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }
  )

  return response.data
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/users/add-user', {
      data
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('/apps/users/delete', {
      data: id
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.metadata.total
      state.params = action.payload.metadata.params
      state.allData = action.payload.metadata.allData
    })
  }
})

export default appUsersSlice.reducer
