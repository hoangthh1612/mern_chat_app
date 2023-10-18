import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.tsx'
import { SocketProvider } from './context/socketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
