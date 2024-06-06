// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import {
  Api,
  CreateProjectRequestDto,
  ProjectResponseDto,
  UpdateProjectRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  query?: string
  fromDate?: string
  toDate?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Projects
export const fetchProject = createAsyncThunk(
  'appProjects/fetchProject',
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
      }).internal.getProjectListForOrganization(organizationId, restParams)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Fetch 1 project
export const fetchAProject = createAsyncThunk(
  'appProjects/fetchAProject',
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
      }).internal.getProjectByIdForAnOrg(organizationId, id)

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Add Project
export const addProject = createAsyncThunk(
  'appProjects/addProject',
  async (data: CreateProjectRequestDto & { organizationId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createProjectsForAnOrganization(organizationId, resData)

      dispatch(fetchProject({ organizationId, query: '' }))
      toast.success('Add project succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Update Project
export const updateProject = createAsyncThunk(
  'appProjects/updateProject',
  async (data: UpdateProjectRequestDto & { organizationId: number; projectId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, ...resData } = data

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateAProjectForAnOrganization(organizationId, resData.projectId, resData)

      dispatch(fetchProject({ organizationId, query: '' }))
      toast.success('Update project succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

// ** Delete Project
export const deleteProject = createAsyncThunk(
  'appProjects/deleteProject',
  async (params: { organizationId: number; projectId: number }, { dispatch }: Redux) => {
    const storedToken = getAccessToken()
    const { organizationId, projectId } = params

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteAProjectForAnOrganization(organizationId, projectId)

      dispatch(fetchProject({ organizationId, query: '' }))
      toast.success('Delete project succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
)

export const appProjectsSlice = createSlice({
  name: 'appProjects',
  initialState: {
    projects: [] as ProjectResponseDto[],
    totalProjects: 0,
    paramsProjects: {},

    project: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.projects = action.payload?.projects || []
      state.totalProjects = action.payload?.metadata.total || 0
      state.paramsProjects = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchAProject.fulfilled, (state, action) => {
        state.project = action.payload || {}
      })
  }
})

export default appProjectsSlice.reducer
