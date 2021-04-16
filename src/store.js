import { configureStore } from '@reduxjs/toolkit'
import wordSlice from './wordSlice'
import userSlice from './userSlice'
export default configureStore({
  reducer: {
    word: wordSlice,
    user: userSlice
  }
})