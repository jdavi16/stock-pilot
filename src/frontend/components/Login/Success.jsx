import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='card-success'>
      <div className='card2-success'>
        <form className='form-success'>
          <h1 style={{ color: "green" }} id='success-heading'>
            User Registered Successfully!
          </h1>
          <p>You will be redirected to the login page shortly</p>
        </form>
      </div>
    </div>
  );
};

export default Success;
