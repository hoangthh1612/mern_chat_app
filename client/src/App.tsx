import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/Login'
import RegisterPage from './pages/Register/Register'
import Layout from './layout/layout'
import HomePage from './pages/Home/Home'
import Messenger from './pages/Messenger/Messenger'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/messenger' element={<Messenger />} />
        </Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
