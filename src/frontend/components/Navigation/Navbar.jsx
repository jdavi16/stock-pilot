import React from "react";
import { NavLink } from "react-router-dom";
import { faDashboard, faBox, faRightFromBracket, faGear, faTools, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const username = localStorage.getItem("username");

  const capitalizeUsername = (name) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <div className='wrapper'>
      <div className='sidebar'>
        <div className='user-profile'>
          <FontAwesomeIcon className='user-icon' icon={faUser} />
          <p className='username'>{capitalizeUsername(username)}</p>
        </div>

        <ul>
          <li>
            <NavLink to='/dashboard' activeClassName='active'>
              <FontAwesomeIcon className='icon' icon={faDashboard} active />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/forgot' activeClassName='active'>
              <FontAwesomeIcon className='icon' icon={faBox} />
              Inventory
            </NavLink>
          </li>
          <li>
            <NavLink to='/register' activeClassName='active'>
              <FontAwesomeIcon className='icon' icon={faTools} />
              Equipment
            </NavLink>
          </li>
          <li>
            <NavLink to='/register' activeClassName='active'>
              <FontAwesomeIcon className='icon' icon={faGear} />
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to='/'>
              <FontAwesomeIcon className='icon' icon={faRightFromBracket} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
