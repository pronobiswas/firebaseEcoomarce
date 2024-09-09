import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Features/AuthSlice.js'

export const store = configureStore({
  reducer: {
    loggedinUderData : AuthSlice,
  },
})