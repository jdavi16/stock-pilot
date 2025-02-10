import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./frontend/scripts/AuthContext";

/** COMPONENTS */
import Header from "./frontend/components/Header/Header";
import Login from "./frontend/components/Login/Login";
import Register from "./frontend/components/Login/Register";
import Success from "./frontend/components/Login/Success";
import Forgot from "./frontend/components/Login/Forgot";
import Dashboard from "./frontend/components/Dashboard/Dashboard";
import Navbar from "./frontend/components/Navigation/Navbar";
import Inventory from "./frontend/components/Inventory/Inventory";
import Equipment from "./frontend/components/Equipment/Equipment";
import Settings from "./frontend/components/Settings/Settings";
/** STYLES */
import "./frontend/styles/main.css";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <AuthProvider>
      <MantineProvider>
        <Router>
          <AppContent />
        </Router>
      </MantineProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Header />
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/equipment' element={<Equipment />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>
    </>
  );
};

export default App;
