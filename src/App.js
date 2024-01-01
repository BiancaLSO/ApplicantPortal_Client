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
import { getNotifications } from "./redux/notifications/notificationsSlice";

function App() {
  const dispatch = useDispatch();
  /* const [applicationId, setApplicationId] = useState(87); */
  const token = useSelector((state) => state.auth.token);
  const credentialsId = useSelector((state) => state.auth.credentialsId);
  const user = useSelector((state) => state.auth.user);
  const applicationIdRedux = useSelector(
    (state) => state.application.applicationId
  );

  useEffect(() => {
    // Example usage:
    // 1. Login
    dispatch(login({ username: "emilie123", password: "123456789" }));
    /* dispatch(setApplicationId(applicationIdRedux)) */
    console.log(token); // Add this line
  }, [dispatch, applicationIdRedux, token]);

  useEffect(() => {
    if (user !== null) {
      dispatch(getNotifications({ userId: user.id, token: token }));
    }
  }, [dispatch, user]);

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
              grantId={3}
              deadline={"2023-12-20"}
              applicationId={applicationIdRedux}
            />
          }
        />
        <Route path="/profile" element={<MyProfile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
