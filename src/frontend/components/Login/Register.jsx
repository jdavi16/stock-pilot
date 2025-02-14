import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomButton, CustomTextField } from "../CustomComponents/CustomComponents";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconLock, IconLockOpen2 } from "@tabler/icons-react";

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
        <div className='flex'>
          <label>
            <CustomTextField required type='text' id='outlined-basic' placeholder='First Name*' autoComplete='off' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            <CustomTextField required type='text' placeholder='Last Name*' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>
        <CustomTextField required type='text' className='input-field' placeholder='Email*' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
        <CustomTextField required type='text' className='input-field' placeholder='Username*' autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} />
        <CustomTextField
          type={showPassword ? "password" : "text"}
          id='outlined-adornment-password'
          placeholder='Password*'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility' sx={{ color: "var(--text)" }} edge='end' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IconLock /> : <IconLockOpen2 />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <CustomButton variant='contained' type='submit' fullWidth>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </CustomButton>
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
