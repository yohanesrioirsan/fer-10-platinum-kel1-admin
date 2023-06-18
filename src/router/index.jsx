import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'

export default function Router() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}/>
        </Routes>
    </div>
    
  )
}
