import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <form className='form-success'>
      <h1 id='success-heading'>User Registered Successfully!</h1>
      <p>You will be redirected to the login page shortly</p>
    </form>
  );
};

export default Success;
