import React from "react";
import Navbar from "../components/navbar"; // Import your Navbar component
import Footer from "../components/footer"; // Import your Navbar component

import "../css/layout.css"; // Import your custom styles
import MyProfileForm from "../components/MyProfileForm";

const MyProfile = () => {
  return (
    <div className="app-container">
      <Navbar />

      <div className="content-container">
        <MyProfileForm />
      </div>

      <Footer />
    </div>
  );
};

export default MyProfile;
