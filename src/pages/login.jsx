import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import "../css/layout.css"; // Import your custom styles
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="app-container">
      <Navbar />

      <div className="content-container">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
};

export default Login;
