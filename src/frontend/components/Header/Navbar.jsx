import React from "react";
import { Link } from "react-router-dom";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const username = localStorage.getItem("username");

  const capitalizeUsername = (name) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <nav className='navbar'>
      <ul className='links'>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/none'>Inventory</Link>
        </li>
        <li>
          <Link to='/none'>Orders</Link>
        </li>
      </ul>
      <div className='navbar-user-btn'>
        <FontAwesomeIcon icon={faUser} className='user-icon' />
        <button className='navbar-user'>{capitalizeUsername(username)}</button>
      </div>
    </nav>
  );
};

export default Navbar;
