import { configureStore } from '@reduxjs/toolkit'
import authorizationSlice from './reducers/authorizationSlice'
import dndSlice from './reducers/dndSlice'

export const store = configureStore({
  reducer: {
    authorizationSlice,
    dndSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch