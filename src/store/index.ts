// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import role from 'src/store/apps/role'
import invoice from 'src/store/apps/invoice'
import permission from 'src/store/auth/permission'
import profile from 'src/store/auth/profile'

export const store = configureStore({
  reducer: {
    user,
    role,
    invoice,
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
