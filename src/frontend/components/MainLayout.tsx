import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import Header from "./Header/Header.js";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  return (
    <div className='main-layout'>
      <Header />
      <Navbar />

      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
