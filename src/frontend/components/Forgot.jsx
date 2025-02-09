import React from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate("/");
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <button type='button' className='button2' onClick={handleCancel}>
        Back
      </button>
    </div>
  );
};

export default Forgot;
