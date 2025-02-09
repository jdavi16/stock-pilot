import React from "react";
import { useNavigate } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate("/dashboard");
  };

  return (
    <div className='container' style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
      <h1>Equipment Coming Soon!</h1>
      <button style={{ marginTop: "20px" }} type='button' className='button2' onClick={handleCancel}>
        Go back
      </button>
    </div>
  );
};

export default Equipment;
