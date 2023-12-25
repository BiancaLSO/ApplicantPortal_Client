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
import { getUserData, login } from "./redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const credentialsId = useSelector((state) => state.credentialsId);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Example usage:
    // 1. Login
    dispatch(login({ username: "sandra.k", password: "123456789" }));
    console.log(credentialsId); // Add this line
  }, [dispatch]);

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
        <Route path="/" element={<Navigate to="/applications" />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/grants" element={<Grants />} />
        <Route
          path="/applications/details"
          element={
            <ApplicationDetails
              grantId={4}
              deadline={"2023-12-20"}
              applicationId={undefined}
              setApplicationId={setApplicationId}
            />
          }
        />
        <Route path="/profile" element={<MyProfile refetch={fetchUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
