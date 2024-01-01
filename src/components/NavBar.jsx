import React, { useState } from "react";
import "../css/navbar.css";
import logo from "../assests/icons/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteNotification,
  readNotification,
} from "../redux/notifications/notificationsSlice";
import { Drawer } from "@mui/material";

const Navbar = ({
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

  const navigateTo = (e, route) => {
    console.log("helloop 1");
    if (
      setOpenResubmitModal !== undefined &&
      setOpenSaveModal !== undefined &&
      setOpenSubmitModal !== undefined &&
      hasFormChanged !== undefined &&
      selectedPage !== undefined
    ) {
      console.log("im here");
      if (selectedPage === "form") {
        if (applicationId && hasBeenSubmitted) {
          console.log("here");
          if (hasFormChanged) {
            console.log("helloop 5");
            e.preventDefault();
            setOpenResubmitModal(true);
          } else {
            console.log("helloop 2");
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
          console.log("helloop3");
          navigate(route);
        }
      } else {
        console.log("helloop 4");
        navigate(route);
      }
    } else {
      navigate(route);
    }
  };

  return (
    <div style={{ gridColumn: "1 / -1", height: "1fr" }}>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar-menu">
          <NavLink
            to={"/applications"}
            onClick={(e) => navigateTo(e, "/applications")}
            activeClassName="selected"
          >
            MY APPLICATIONS
          </NavLink>
          <NavLink
            to={"/grants"}
            onClick={(e) => navigateTo(e, "/grants")}
            activeClassName="selected"
          >
            CREATE APPLICATIONS
          </NavLink>
          <NavLink
            to={"/profile"}
            onClick={(e) => navigateTo(e, "/profile")}
            activeClassName="selected"
          >
            MY PROFILE
          </NavLink>
          <div
            onClick={() => {
              setOpenDropdown(!openDropdown);
              if (notifications && notifications.length > 0) {
                notifications.map((notification) => {
                  if (!notification.isRead) {
                    dispatch(
                      readNotification({
                        notificationId: notification.id,
                        userId: user.id,
                        token: token,
                      })
                    );
                  }
                });
              }
            }}
            className="logout-link"
            style={{ marginRight: "-5rem", cursor: "pointer" }}
          >
            <span className="material-symbols-outlined logout-icon-container">
              notifications
            </span>
            {notifications &&
              notifications.some((item) => item.isRead === false) && (
                <span className="notification-bubble">
                  <p>
                    {notifications &&
                      notifications.filter((item) => !item.isRead).length}
                  </p>
                </span>
              )}
          </div>
          <NavLink
            to={"/auth/login"}
            onClick={(e) => navigateTo(e, "/auth/login")}
            activeClassName="selected"
            className="logout-link"
          >
            <span className="material-symbols-outlined logout-icon-container">
              logout
            </span>
          </NavLink>
        </div>
      </nav>
      {openDropdown && (
        <Drawer
          anchor={"right"}
          open={openDropdown}
          onClose={() => setOpenDropdown(false)}
          PaperProps={{
            style: {
              marginTop: "6.8%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            },
          }}
          BackdropProps={{ invisible: true }}
        >
          <div
            style={{
              padding: "2rem",
            }}
          >
            {notifications && notifications.length > 0 ? (
              notifications
                .sort((a, b) => b.id - a.id)
                .map((item, index) => (
                  <div
                    style={{
                      outlineStyle: "solid",
                      outlineColor: "#D3D0D0",
                      padding: "0 2rem 0 2rem",
                      outlineWidth: 2,
                      borderRadius: 10,
                    }}
                    key={index}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h4>{item.title}</h4>
                        <span
                          class="material-symbols-outlined"
                          style={{
                            color: "#C0002A",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dispatch(
                              deleteNotification({
                                notificationId: item.id,
                                userId: user.id,
                                token: token,
                              })
                            );
                          }}
                        >
                          delete
                        </span>
                      </div>
                      <p style={{ maxWidth: "22rem", marginTop: -10 }}>
                        {item.description}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <p></p>
                      <p>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            paddingRight: "0.2rem",
                            color: "#4F4E50",
                          }}
                        >
                          Sent:{" "}
                        </span>
                        {moment(item.sent_date).format("DD/MM/YYYY [at] HH:mm")}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div>
                <p>There is currently no notifications to display.</p>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Navbar;
