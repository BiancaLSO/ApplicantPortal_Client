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
import { login } from "./redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login";
import { getNotifications } from "./redux/notifications/notificationsSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const credentialsId = useSelector((state) => state.credentialsId);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      dispatch(getNotifications({ userId: user.id, token: token }));
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/applications" />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/grants" element={<Grants />} />
        <Route
          path="/applications/details"
          element={<ApplicationDetails deadline={"2023-12-20"} />}
        />
        <Route path="/profile" element={<MyProfile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
