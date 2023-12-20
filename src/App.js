import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import MyProfile from "./pages/my-profile";
import Grants from "./pages/grants";

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
}

export default App;
