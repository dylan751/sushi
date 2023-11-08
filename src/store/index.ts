// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import role from 'src/store/apps/role'

export const store = configureStore({
  reducer: {
    user,
    role
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
