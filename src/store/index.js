import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Redux/auth/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = { key: 'auth', storage }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: {
    auth: persistedReducer
  }
})
export default store

export const Persistor = persistStore(store)
