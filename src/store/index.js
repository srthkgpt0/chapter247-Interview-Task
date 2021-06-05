import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Redux/auth/authSlice'
export default configureStore({
  reducer: {
    auth: authReducer
  }
})
