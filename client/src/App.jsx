import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './Components/Layout/NavBar.jsx';
import Registration from './Components/AuthoPages/Registration.jsx';
import Login from './Components/AuthoPages/Login.jsx';
import HomePage from './Components/StorePage/HomePage.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import UserDashboard from './Components/User/UserDashboard.jsx';
import PrivateRoute from './Components/AuthoPages/PrivateRoute.jsx';
import BookDetails from './Components/StorePage/BookDetails.jsx';

const App = () => {
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/register', '/admin'];
  const hideNavBar = hideNavBarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideNavBar && <NavBar />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/book/:id" element={<BookDetails />} />
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
        <Route path="/unauthorized" element={<h2>Access Denied</h2>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default App;
