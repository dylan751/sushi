// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Types
import { Api, ProfileResponseDto, UpdateProfileRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Profile
export const fetchProfile = createAsyncThunk('authProfile/fetchProfile', async () => {
  const storedToken = getAccessToken()
  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getUserProfile()

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Update Profile
export const updateProfile = createAsyncThunk(
  'authProfile/updateProfile',
  async (data: UpdateProfileRequestDto, { dispatch }: Redux) => {
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateUserProfile(data)

      dispatch(fetchProfile())
      toast.success('Update user profile succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const authProfileSlice = createSlice({
  name: 'authProfile',
  initialState: {
    data: {} as ProfileResponseDto
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.data = action.payload!
    })
  }
})

export default authProfileSlice.reducer
