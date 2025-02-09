import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate("/");
  };

  return (
    <div className='container' style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
      <h1>Dashboard Coming Soon!</h1>
      <button style={{ marginTop: "20px" }} type='button' className='button2' onClick={handleCancel}>
        Go back to Login
      </button>
    </div>
  );
};

export default Dashboard;
