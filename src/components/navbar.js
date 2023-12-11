import React from "react";
import "../css/navbar.css";

import { Link } from "react-router-dom"; // If you're using React Router

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <p>Lets put Link afterwards here</p>
      </div>
      <button className="navbar-toggle">Menu</button>
      <div>
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
        {/* Add more links as needed */}
      </div>
    </nav>
  );
};

export default Navbar;
