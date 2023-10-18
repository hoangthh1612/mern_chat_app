import React from 'react'
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div id="w-full h-full container">
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout;