import logo from "./logo.svg";
import "./App.css";
import MyApplications from "./pages/my-applications";
import LoginForm from "./components/LoginForm";
import { useState, useEffect } from "react";

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

  return <LoginForm />;
}

export default App;
