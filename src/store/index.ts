// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/organization/user'
import role from 'src/store/apps/organization/role'
import budget from 'src/store/apps/organization/project/budget'
import category from 'src/store/apps/organization/project/category'
import invoice from 'src/store/apps/organization/invoice'
import organization from 'src/store/apps/organization'
import project from 'src/store/apps/organization/project'
import projectStatistics from 'src/store/apps/organization/project/statistics'
import organizationStatistics from 'src/store/apps/organization/statistics'
import permission from 'src/store/auth/permission'
import profile from 'src/store/auth/profile'

export const store = configureStore({
  reducer: {
    user,
    role,
    budget,
    category,
    invoice,
    organization,
    project,
    projectStatistics,
    organizationStatistics,
    permission,
    profile
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
