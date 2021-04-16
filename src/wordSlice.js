import { createSlice } from '@reduxjs/toolkit'
let totalKnownItemsInLocalStorage = 0
let totalUnknownItemsInLocalStorage = 0
let totalKnownOnPage = 0
let totalUnknownOnPage = 0
Object.values(localStorage).forEach(val => {
  if (val === "word_card_known") {
    totalKnownItemsInLocalStorage++
  }
  if (val === "word_card_unknown") {
    totalUnknownItemsInLocalStorage++
  }
})
const initialState = {
  totalKnown: totalKnownItemsInLocalStorage,
  totalUnknown: totalUnknownItemsInLocalStorage,
  totalKnownOnPage,
  totalUnknownOnPage
}
export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    increaseOneKnown: (state, action) => {
      state.totalKnownOnPage += 1
      state.totalKnown += 1
    },
    decreaseOneKnown: (state) => {
      state.totalKnownOnPage = ((state.totalKnownOnPage > 0) && (state.totalKnownOnPage - 1))
      state.totalKnown = ((state.totalKnown > 0) && (state.totalKnown - 1))
    },
    increaseOneUnknown: (state) => {
      state.totalUnknownOnPage += 1
      state.totalUnknown += 1
    },
    decreaseOneUnknown: (state) => {
      state.totalUnknownOnPage = ((state.totalUnknownOnPage > 0) && (state.totalUnknownOnPage - 1))
      state.totalUnknown = ((state.totalUnknown > 0) && (state.totalUnknown - 1))
    },
    setOnPage: (state, action) => {
      state.totalKnownOnPage = action.payload.totalKnownOnPage
      state.totalUnknownOnPage = action.payload.totalUnknownOnPage
    },
    clearAll: (state) => {
      state.totalKnownOnPage = 0
      state.totalUnknownOnPage = 0
    }
  }
})
export default wordSlice.reducer