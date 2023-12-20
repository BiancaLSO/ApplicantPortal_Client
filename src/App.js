import "./App.css";
import { useEffect, useState } from "react";
import MyProfile from "./pages/my-profile";
import Grants from "./pages/grants";
import MyApplications from "./pages/my-applications";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUpForm";
import ApplicationDetails from "./pages/application-details";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";

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
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/applications" />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/applications/details" element={<ApplicationDetails />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
