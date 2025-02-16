import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./frontend/scripts/AuthContext";
import "@mantine/core/styles.css";

/** COMPONENTS */
import Header from "./frontend/components/Header/Header.jsx";
import Login from "./frontend/components/Login/Login.jsx";
import Register from "./frontend/components/Login/Register.jsx";
import Success from "./frontend/components/Login/Success.jsx";
import Forgot from "./frontend/components/Login/Forgot.jsx";
import MainLayout from "./frontend/components/MainLayout.jsx";
import Dashboard from "./frontend/components/Dashboard/Dashboard.jsx";
//import Navbar from "./frontend/components/Navigation/Navbar";
import Inventory from "./frontend/components/Inventory/Inventory.jsx";
import Equipment from "./frontend/components/Equipment/Equipment.jsx";
import Settings from "./frontend/components/Settings/Settings.jsx";
/** STYLES */
import "./frontend/styles/main.css";
import { MantineProvider } from "@mantine/core";

const App: React.FC = () => {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
};

const AppContent = () => {
  //const { isLoggedIn } = useAuth();
  return (
    <>
      <Header />
      {/**{isLoggedIn && <Navbar />}*/}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='inventory' element={<Inventory />} />
          <Route path='equipment' element={<Equipment />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>
    </>
  );
};

export default App;
