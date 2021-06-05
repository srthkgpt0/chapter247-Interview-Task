import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: {}
  },
  reducers: {
    loginAction: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      }
    },
    logoutAction: (state) => {
      return {
        ...state,
        isLoggedIn: false,
        userData: {}
      }
    }
  }
})

export const { loginAction, logoutAction } = authSlice.actions
export default authSlice.reducer
