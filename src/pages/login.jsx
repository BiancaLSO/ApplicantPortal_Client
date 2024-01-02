import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

import { useState } from "react";
import { useDispatch } from "react-redux";

import "../css/layout.css"; // Import your custom styles
import "../css/login.css"; // Import your custom styles
import PhoneIcon from "../images/contact-us.svg";
import LogoIcon from "../images/logo2.svg";

import { login } from "../redux/auth/authSlice";
import SignUp from "../components/SignUpForm";

const Login = () => {
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState("MitID");

  const handleTabClick = (tabName) => {
    setSelectedPage(tabName);
  };

  const onSubmitForm = (values) => {
    dispatch(login({ username: values.email, password: values.password }));
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="top-container">
          <div className="tabs">
            <div
              className={`tab ${selectedPage === "MitID" ? "active" : ""}`}
              onClick={() => handleTabClick("MitID")}
            >
              {" "}
              MitID LOGIN
            </div>
            <div
              className={`tab ${selectedPage === "User" ? "active" : ""}`}
              onClick={() => handleTabClick("User")}
            >
              USER LOGIN
            </div>
          </div>

          <div className="text-box">
            <p className="text-box-paragraph">
              Login to the Grant portal to apply or communicate with us about
              your application, please use a 'USER LOGIN' to the Grant Portal if
              you are already registered, otherwise to register use MitID LOGIN
              (Denmark's national authentication service), for example, if you
              are a foreign applicant. Order the login on SLKS.dk
            </p>
            <p className="text-box-paragraph">
              Remember to close your internet browser when logging out, to
              protect your personal information.
            </p>
          </div>
        </div>

        <div
          className={`main-container ${
            selectedPage === "MitID" ? "start" : "space-between"
          }`}
        >
          <div className="address-contact-div">
            <div className="address-div">
              <img
                loading="lazy"
                src={LogoIcon}
                alt="logo"
                className="img-logo"
              />
              <div className="address-title">
                Slots- og Kulturstyrelsen / Ministry of Culture and Palaces
              </div>
              <div className="address-address">
                Hammerichsgade 14, DK
                <br />
                1611 København V
              </div>
            </div>

            <div className="contact-div">
              <div className="contact-div-title">Write to us :</div>
              <div className="contact-div-link">Tilskudsportal@slks.dk</div>
              <div className="contact-div-contact-us">Contact us :</div>
              <div className="contact-div-hours">
                Mon - Fri : 08:00 - 17:00
                <br />
              </div>
              <div className="contact-div-hours-text">
                Sat - Sun : 09:00 - 13:00
                <br />
              </div>
              <div className="contact-div-img-phone-text">
                <img
                  loading="lazy"
                  src={PhoneIcon}
                  alt="phone"
                  className="img-phone"
                />
                <div className="contact-div-phone-text">+45 33 95 42 00</div>
              </div>
            </div>
          </div>
          {selectedPage === "User" && <LoginForm onSubmitForm={onSubmitForm} />}
          {selectedPage === "MitID" && <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Login;
