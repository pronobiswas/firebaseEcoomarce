import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Features/AuthSlice.js'
import itemSlice from './Features/ItemSlice.js'

export const store = configureStore({
  reducer: {
    loggedInUserData : AuthSlice,
    itemInfo: itemSlice ,
  },
})