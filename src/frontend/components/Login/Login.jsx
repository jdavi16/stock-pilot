import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../scripts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const { setIsLoggedIn } = useAuth();
  const [error, setError] = useState(null);

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

  const handleLogin = async (e) => {
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
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("There was a problem logging in");
      }
    } catch (err) {
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
            <p id='heading'>Login</p>
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
            <div className='btn'>
              <button type='submit' className='button1'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button type='button' className='button2' onClick={handleRegister}>
                Sign Up
              </button>
            </div>
            <button type='button' className='button3' onClick={handleForgot}>
              Forgot Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
