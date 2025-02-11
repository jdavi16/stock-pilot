import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faLock, faEnvelope, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        firstName,
        lastName,
        email,
        username,
        password,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");

      navigate("/success");
    } catch (err) {
      setErrorMessage(err.response ? err.response.data.message : "Error registering");
      setSuccessMessage("");
    }
  };

  const handleCancel = (e) => {
    navigate("/");
  };

  return (
    <div>
      {errorMessage && (
        <p className='login-message' style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}

      <form className='form' onSubmit={handleRegister}>
        <p className='title'>Register</p>
        <p className='header'>Sign up now and get full access</p>
        <div className='name-field'>
          <label>
            <input type='text' className='input-field' placeholder='First Name' autoComplete='off' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            <input type='text' className='input-field' placeholder='Last Name' autoComplete='off' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>
        <div className='field'>
          <FontAwesomeIcon icon={faEnvelope} className='field-icon' />
          <input type='text' className='input-field' placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='field'>
          <FontAwesomeIcon icon={faUser} className='field-icon' />
          <input type='text' className='input-field' placeholder='Username' autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='field'>
          <button type='button' className='show-password' onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
            <FontAwesomeIcon icon={showPassword ? faLock : faUnlock} className='field-icon' />
          </button>
          <input type={showPassword ? "password" : "text"} className='input-field' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit' className='submit'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <p className='signin'>
          Already have an account?
          <button className='signin-btn' onClick={handleCancel}>
            Sign In
          </button>
        </p>
      </form>

      {successMessage && (
        <p className='login-message' style={{ color: "green" }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default Register;
