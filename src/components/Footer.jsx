import React from "react";
import "../css/footer.css";
import logo2 from "../assests/icons/logo2.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo-links">
        <img src={logo2} alt="logo" />
        <p className="footer-logo-link-1">Slots- og Kulturstyrelsen </p>
        <p className="footer-logo-link-2">
          Ministry of Culture and Palaces København V
        </p>
        <p className="footer-logo-link-3">
          Hammerichsgade 14, DK 1611 København V
        </p>
      </div>
      <div className="footer-basic-info">
        <div className="text-write">Write to us: </div>
        <a href="tilskudsportal@slks.dk" className="email">
          tilskudsportal@slks.dk
        </a>
        <div className="text-contact">Contact us:</div>
        <div className="text-scedule">Mon - Fri : 08:00 - 17:00</div>
        <div className="text-scedule">Sat - Sun : 09:00 - 13:00</div>
        <div className="phone-info">
          <div className="phone-icon-container">
            <span className="material-symbols-outlined">phone_in_talk</span>
          </div>
          <a href="+45 33 95 42 00" className="phone-number">
            +45 33 95 42 00
          </a>
        </div>
      </div>
      <div className="footer-send-complaint">
        <textarea
          className="text-area"
          placeholder="Send in your questions or complaints!"
        />
        <button className="send-button">SEND</button>
      </div>
      <div className="footer-menu-links">
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
    </div>
  );
};

export default Footer;
