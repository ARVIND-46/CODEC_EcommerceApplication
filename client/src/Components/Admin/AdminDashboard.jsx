import React from 'react';
import ManageBannerSlider from './ManageBannerSlider';
import ManageBooks from './ManageBooks';
import '../../styles/AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ManageBannerSlider />
      <ManageBooks />
    </div>
  );
};

export default AdminDashboard;