import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/Layout/NavBar.jsx';
import Registration from './Components/AuthoPages/Registration.jsx';
import Login from './Components/AuthoPages/Login.jsx';
import HomePage from './Components/StorePage/HomePage.jsx'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  )
}

export default App
