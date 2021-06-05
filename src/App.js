import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
