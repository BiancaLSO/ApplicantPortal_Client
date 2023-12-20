import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import MyProfile from "./pages/my-profile";
import Grants from "./pages/grants";
import MyApplications from "./pages/my-applications";
import LoginForm from "./components/LoginForm";
import { useState, useEffect } from "react";
import ApplicationDetails from "./pages/application-details";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    fetch(`http://localhost:3005/user/3`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  /* return <MyProfile refetch={fetchUser} />; */
  return <MyApplications />;
  // return <Grants />;
  /* return <LoginForm />;
  return (
    <ApplicationDetails
      grantId={3}
      deadline={new Date("November 24, 2023 23:59:00")}
      applicationId={35}
    />
  ); */
}

export default App;
