import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'

export default function Router() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route element={<Layout/>} >
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/cars' element={<Dashboard/>}/>
            </Route>
        </Routes>
    </div>
    
  )
}
