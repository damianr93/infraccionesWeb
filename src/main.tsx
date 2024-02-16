import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TransitoApp } from './transitoApp'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitoApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
