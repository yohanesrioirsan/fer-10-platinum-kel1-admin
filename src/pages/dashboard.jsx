// import React from 'react'
import react, { useState } from 'react'
import Home from './home'

export default function Dashboard() {
    const [data, setDate] = useState([])

  return (
    <>
        <Home data={data}/>
        <div>dashboard</div>
    </>
  )
}
