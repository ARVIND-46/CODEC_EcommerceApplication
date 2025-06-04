import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './Components/Registration.jsx'
import Login from './Components/Login.jsx'
import HomePage from './Components/HomePage.jsx'

const App = () => {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage/>  } />
      </Routes>
    </Router>
    </>
  )
}

export default App