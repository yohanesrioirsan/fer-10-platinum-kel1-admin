import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

export default function Layout() {
  return (
    <div className='d-flex vh-100 '>
        <Sidebar/>
        <Outlet/>

    </div>
  )
}
