import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import './App.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { Persistor } from './store'
import 'antd/dist/antd.css'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<>Loading...</>} persistor={Persistor}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
