import "./App.css";
import MyProfile from "./pages/my-profile";
import Grants from "./pages/grants";
import MyApplications from "./pages/my-applications";
import ApplicationDetails from "./pages/application-details";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login";

function App() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

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
