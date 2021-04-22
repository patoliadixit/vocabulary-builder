import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loggedIn: Boolean(localStorage.getItem('username')),
  username: localStorage.getItem('username')
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logging_in: (state, action) => {
      state.loggedIn = true
      state.username = action.payload.username
      localStorage.setItem('username', action.payload.username)
    },
    logging_out: (state) => {
      state.loggedIn = false
      state.username = ""
      localStorage.removeItem('username')
      localStorage.removeItem('token')
    }
  }
})
export const { logging_in, logging_out } = userSlice.actions
export default userSlice.reducer