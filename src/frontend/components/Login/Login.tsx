import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../scripts/AuthContext";
import { CustomTextField } from "../CustomComponents/CustomComponents";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconLock, IconLockOpen2 } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { setIsLoggedIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false); // Ensure user is logged out when navigating to the login page
  }, [setIsLoggedIn]);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgot = () => {
    navigate("/forgot");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      console.log("Login response:", response.data);
      if (response.data.message === "Login successful") {
        // Store token for session management

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("lastName", response.data.lastName);

        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("There was a problem logging in");
      }
    } catch (err: unknown) {
      console.error("Error during login:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      {error && (
        <p className='login-message' style={{ color: "#CF6679" }}>
          {error}
        </p>
      )}
      <div className='card'>
        <div className='card2'>
          <form onSubmit={handleLogin} className='form'>
            <p className='title' id='login'>
              Login
            </p>
            <CustomTextField type='text' required className='input-field' placeholder='Username*' autoComplete='off' value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
            <CustomTextField
              type={showPassword ? "password" : "text"}
              id='outlined-adornment-password'
              placeholder='Password*'
              required
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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

            <div className='btn'>
              <Button variant='filled' color='var(--accent)' type='submit' fullWidth>
                Login
              </Button>
              <Button variant='filled' color='var(--accent)' type='button' fullWidth onClick={handleRegister}>
                Sign Up
              </Button>
            </div>
            <Button variant='filled' type='button' color='var(--accent)' fullWidth onClick={handleForgot}>
              Forgot Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
