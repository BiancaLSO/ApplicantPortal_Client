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
        <p>MY APPLICATIONS</p>
        <p>CREATE APPLICATIONS</p>
        <p>MY PROFILE</p>
        <p>
          <span class="material-symbols-outlined">logout</span>
        </p>

        {/* Uncomment these after the routing is done */}
        {/* <NavLink to="/my-applications" activeClassName="selected">
          MY APPLICATIONS
        </NavLink>
        <NavLink to="/create-applications" activeClassName="selected">
          CREATE APPLICATIONS
        </NavLink>
        <NavLink to="/my-profile" activeClassName="selected">
          MY PROFILE
        </NavLink>
        <NavLink to="/logout" activeClassName="selected" className="logout-link">
          <span className="material-symbols-outlined">logout</span>
        </NavLink> */}
      </div>
    </nav>
  );
};

export default Navbar;
