import React from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate("/");
  };

  return (
    <div>
      <h1>Coming Soon!</h1>
      <button style={{ marginTop: "20px" }} type='button' className='button2' onClick={handleCancel}>
        Go back to Login
      </button>
    </div>
  );
};

export default Forgot;
