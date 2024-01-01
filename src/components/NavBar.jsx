import React from "react";
import "../css/navbar.css";
import logo from "../assests/icons/logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-menu">
        <NavLink to="/applications" activeClassName="selected">
          MY APPLICATIONS
        </NavLink>
        <NavLink to="/grants" activeClassName="selected">
          CREATE APPLICATIONS
        </NavLink>
        <NavLink to="/profile" activeClassName="selected">
          MY PROFILE
        </NavLink>
        <NavLink to="/login" activeClassName="selected" className="logout-link">
          <span className="material-symbols-outlined logout-icon-container">
            logout
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
