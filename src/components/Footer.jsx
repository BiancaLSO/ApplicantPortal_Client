import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/footer.css";
import logo2 from "../assests/icons/logo2.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { resetTokenState } from "../redux/auth/authSlice";

const Footer = ({
  setOpenResubmitModal,
  setOpenSaveModal,
  setOpenSubmitModal,
  hasFormChanged,
  selectedPage,
}) => {
  const navigate = useNavigate();
  const applicationId = useSelector((state) => state.application.applicationId);
  const user = useSelector((state) => state.auth.user);
  const hasBeenSubmitted = useSelector(
    (state) => state.application.hasBeenSubmitted
  );
  const application = useSelector((state) => state.application.application);
  const token = useSelector((state) => state.auth.token);
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const routesWithoutButtons = ["/auth/signup", "/auth/login"];
  const hideButtons = routesWithoutButtons.includes(location.pathname);

  const navigateTo = (e, route) => {
    if (
      setOpenResubmitModal !== undefined &&
      setOpenSaveModal !== undefined &&
      setOpenSubmitModal !== undefined &&
      hasFormChanged !== undefined &&
      selectedPage !== undefined
    ) {
      if (selectedPage === "form") {
        if (applicationId && hasBeenSubmitted) {
          if (hasFormChanged) {
            e.preventDefault();
            setOpenResubmitModal(true);
          } else {
            navigate(route);
          }
        } else if (applicationId === undefined) {
          e.preventDefault();
          setOpenSaveModal(true);
        } else if (!hasBeenSubmitted && hasFormChanged) {
          if (application?.activities && application?.activities.length > 0) {
            e.preventDefault();
            setOpenSubmitModal(true);
          } else {
            e.preventDefault();
            setOpenSaveModal(true);
          }
        } else {
          navigate(route);
        }
      } else {
        navigate(route);
      }
    } else {
      navigate(route);
    }
  };

  useEffect(() => {
    if (token === undefined) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

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
        <a href="mailto:tilskudsportal@slks.dk" className="email">
          tilskudsportal@slks.dk
        </a>
        <div className="text-contact">Contact us:</div>
        <div className="text-scedule">Mon - Fri : 08:00 - 17:00</div>
        <div className="text-scedule">Sat - Sun : 09:00 - 13:00</div>
        <div className="phone-info">
          <div className="phone-icon-container">
            <span className="material-symbols-outlined">phone_in_talk</span>
          </div>
          <a href="tel:+45 33 95 42 00" className="phone-number">
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
        <NavLink
          to={"/applications"}
          onClick={(e) => navigateTo(e, "/applications")}
          activeclassname="selected"
        >
          MY APPLICATIONS
        </NavLink>
        <NavLink
          to={"/grants"}
          onClick={(e) => navigateTo(e, "/grants")}
          activeclassname="selected"
        >
          CREATE APPLICATIONS
        </NavLink>
        <NavLink
          to={"/profile"}
          onClick={(e) => navigateTo(e, "/profile")}
          activeclassname="selected"
        >
          MY PROFILE
        </NavLink>
        <NavLink
          to={"/auth/login"}
          onClick={(e) => {
            dispatch(resetTokenState(undefined));
          }}
          activeclassname="selected"
          className="logout-link"
        >
          <span className="material-symbols-outlined logout-icon-container">
            logout
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
