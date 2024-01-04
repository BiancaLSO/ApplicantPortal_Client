import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../css/layout.css"; // Import your custom styles
import "../css/login.css"; // Import your custom styles
import PhoneIcon from "../images/phone.svg";
import LogoIcon from "../images/logo2.svg";

import { login } from "../redux/auth/authSlice";
import { signup } from "../redux/auth/authSlice";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const signupResponse = useSelector((state) => state.auth.signupResponse);
  const [selectedPage, setSelectedPage] = useState("User");

  const handleTabClick = (tabName) => {
    console.log(tabName);
    setSelectedPage(tabName);
  };

  const onSubmitLoginForm = (values) => {
    dispatch(login({ username: values.username, password: values.password }));
  };

  useEffect(() => {
    console.log("token", token);
    if (token) {
      navigate("/applications");
    }
  }, [token]);

  useEffect(() => {
    console.log("signupResponse", signupResponse);
    if (signupResponse) {
      setSelectedPage("User");
    }
  }, [signupResponse]);

  const onSubmitSignUpForm = (values) => {
    dispatch(
      signup({
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        cpr: values.cpr,
        phone: values.phone,
        email: values.email,
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
      })
    );
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="login-content-container">
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

        <div className="main-container">
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
                <div
                  style={{
                    backgroundColor: "#c0002a",
                    borderRadius: "100%",
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    marginRight: "0.5rem",
                  }}
                >
                  <img
                    loading="lazy"
                    src={PhoneIcon}
                    alt="phone"
                    style={{
                      padding: "0.6rem",
                      width: "2.3rem",
                      height: "2rem",
                      padding: "0.5rem",
                      width: "2rem",
                    }}
                  />
                </div>
                <div className="contact-div-phone-text">+45 33 95 42 00</div>
              </div>
            </div>
          </div>
          {selectedPage === "User" && (
            <LoginForm onSubmitLoginForm={onSubmitLoginForm} />
          )}
          {selectedPage === "MitID" && (
            <SignUpForm onSubmitSignUpForm={onSubmitSignUpForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
