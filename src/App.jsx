import React from "react";
import Header from "./frontend/components/Header/Header";
import Login from "./frontend/components/Login";
import Register from "./frontend/components/Register";
import Success from "./frontend/components/Success";
import Forgot from "./frontend/components/Forgot";
import Dashboard from "./frontend/components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./frontend/components/scripts/AuthContext";

import "./frontend/styles/main.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>
    </>
  );
};

export default App;
