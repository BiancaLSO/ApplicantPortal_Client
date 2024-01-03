import "./App.css";
import { useEffect, useState } from "react";
import MyProfile from "./pages/my-profile";
import Grants from "./pages/grants";
import MyApplications from "./pages/my-applications";
import ApplicationDetails from "./pages/application-details";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
import { getUserData, login } from "./redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const credentialsId = useSelector((state) => state.credentialsId);
  const user = useSelector((state) => state.user);

  /*   const [user, setUser] = useState(null);

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
  }, []); */

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/applications" : "/auth/login"} />}
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/grants" element={<Grants />} />
        <Route
          path="/applications/details"
          element={
            <ApplicationDetails
              grantId={1}
              deadline={"2023-12-21"}
              applicationId={undefined}
            />
          }
        />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
