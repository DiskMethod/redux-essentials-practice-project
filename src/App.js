import React from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar } from './app/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Outlet />
      </div>
    </>
  )
}

export default App
