import React from "react";
import { useNavigate } from "react-router-dom";

const Equipment: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h1>Equipment Coming Soon!</h1>
    </div>
  );
};

export default Equipment;
