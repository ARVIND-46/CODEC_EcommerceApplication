import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/Layout/NavBar.jsx';
import Registration from './Components/AuthoPages/Registration.jsx';
import Login from './Components/AuthoPages/Login.jsx';
import HomePage from './Components/StorePage/HomePage.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import UserDashboard from './Components/User/UserDashboard.jsx';
import PrivateRoute from './Components/AuthoPages/PrivateRoute.jsx';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/*  Protected User Dashboard */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Optional unauthorized page */}
        <Route path="/unauthorized" element={<h2>Access Denied</h2>} />
      </Routes>
    </>
  )
}

export default App
