import React from "react";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate("/dashboard");
  };

  return (
    <div className='container'>
      <h1>Inventory Coming Soon!</h1>
      <button style={{ marginTop: "20px" }} type='button' className='button2' onClick={handleCancel}>
        Go back
      </button>
    </div>
  );
};

export default Inventory;
