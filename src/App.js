import logo from "./logo.svg";
import "./App.css";
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

  return (
    <ApplicationDetails
      grantId={1}
      deadline={new Date("November 24, 2023 23:59:00")}
      applicationId={22}
    />
  );
}

export default App;
