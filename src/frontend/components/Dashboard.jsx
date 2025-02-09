import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate("/");
  };

  return (
    <div className='container'>
      <h1>Dashboard</h1>
      {/* New section for user statistics */}
      <div className='user-stats'>
        <h2>User Statistics</h2>
        <p>Total Users: 100</p>
        <p>Active Users: 80</p>
        <p>Inactive Users: 20</p>
      </div>
      <button type='button' className='button2' onClick={handleCancel}>
        Back
      </button>
    </div>
  );
};

export default Dashboard;
