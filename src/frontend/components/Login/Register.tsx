import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconLock, IconLockOpen2 } from "@tabler/icons-react";
import { Button, TextInput } from "@mantine/core";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error with Registration");
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      {errorMessage && (
        <p className='login-message' id='error-message'>
          {errorMessage}
        </p>
      )}

      <form className='form' onSubmit={handleRegister}>
        <p className='title'>Register</p>
        <p className='header'>Sign up now and get full access</p>
        <div className='flex'>
          <label>
            <TextInput required type='text' id='outlined-basic' placeholder='First Name*' autoComplete='off' value={firstName} onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
          </label>
          <label>
            <TextInput required type='text' placeholder='Last Name*' value={lastName} onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
          </label>
        </div>
        <TextInput required type='text' className='input-field' placeholder='Email*' autoComplete='off' value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <TextInput required type='text' className='input-field' placeholder='Username*' autoComplete='off' value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
        <TextInput type={showPassword ? "password" : "text"} id='outlined-adornment-password' placeholder='Password*' value={password} required onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        <Button variant='filled' color='var(--accent)' type='submit' fullWidth autoContrast>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
        <p className='signin'>
          Already have an account?
          <button type='button' className='signin-btn' onClick={handleCancel}>
            Sign In
          </button>
        </p>
      </form>

      {successMessage && (
        <p className='login-message' id='success-message'>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default Register;
