import { createSlice } from "@reduxjs/toolkit";
const currentPage = +localStorage.getItem("currentPage") || 1;
const initialState = {
  totalKnown: 0,
  totalUnknown: 0,
  totalKnownOnPage: 0,
  totalUnknownOnPage: 0,
  currentPage,
};
export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      localStorage.setItem("currentPage", +state.currentPage + +action.payload);
      state.currentPage += action.payload;
    },
    setCurrentPageTo: (state, action) => {
      localStorage.setItem("currentPage", +action.payload);
      state.currentPage = action.payload;
    },
    setInitial: (state, action) => {
      state.totalKnown = action.payload.totalKnown;
      state.totalUnknown = action.payload.totalUnknown;
    },
    increaseOneKnown: (state, action) => {
      state.totalKnownOnPage += 1;
      state.totalKnown += 1;
    },
    decreaseOneKnown: (state) => {
      state.totalKnownOnPage =
        state.totalKnownOnPage > 0 && state.totalKnownOnPage - 1;
      state.totalKnown = state.totalKnown > 0 && state.totalKnown - 1;
    },
    increaseOneUnknown: (state) => {
      state.totalUnknownOnPage += 1;
      state.totalUnknown += 1;
    },
    decreaseOneUnknown: (state) => {
      state.totalUnknownOnPage =
        state.totalUnknownOnPage > 0 && state.totalUnknownOnPage - 1;
      state.totalUnknown = state.totalUnknown > 0 && state.totalUnknown - 1;
    },
    setOnPage: (state, action) => {
      state.totalKnownOnPage = action.payload.totalKnownOnPage;
      state.totalUnknownOnPage = action.payload.totalUnknownOnPage;
    },
    clearAll: (state) => {
      state.totalKnownOnPage = 0;
      state.totalUnknownOnPage = 0;
    },
  },
});
export const {
  setCurrentPage,
  setCurrentPageTo,
  setInitial,
  setOnPage,
  clearAll,
  decreaseOneKnown,
  decreaseOneUnknown,
  increaseOneKnown,
  increaseOneUnknown,
} = wordSlice.actions;
export default wordSlice.reducer;
