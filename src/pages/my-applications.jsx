import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/layout.css";
import "../css/my-applications-page.css";
import SearchBarApplication from "../components/SearchBarApplication";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ApplicationTable from "../components/ApplicationTable";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/auth/authSlice";
import { getApplicationByUserId } from "../redux/application/applicationSlice";

const data = [
  {
    journalNr: "SKBP36W.2023-0155",
    applicationName:
      "Specialundervisningsstøtte til folkehøjskolerne (SPS): Ansøg om tilskud til specialundervisning 2023",
    grant:
      "Specialundervisningsstøtte til folkehøjskolerne (SPS): Ansøg om tilskud til specialundervisning 2023",
    status: {
      name: "Closed without submission",
    },
    lastActivity: "09-11-2023 at 20:02:57",
    iconColumn: true,
  },
  {
    journalNr: "SKBP36W.2023-0155",
    applicationName:
      "Specialundervisningsstøtte til folkehøjskolerne (SPS): Ansøg om tilskud til specialundervisning 2023",
    grant:
      "Specialundervisningsstøtte til folkehøjskolerne (SPS): Ansøg om tilskud til specialundervisning 2023",
    status: {
      name: "Closed without submission",
    },
    lastActivity: "09-11-2023 at 20:02:57",
    iconColumn: true,
  },
];

const MyApplications = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const applications = useSelector((state) => state.application.applications);

  useEffect(() => {
    dispatch(getUserData({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      const userId = user.id;
      dispatch(getApplicationByUserId({ userId, token }));
      console.log(applications);
    }
  }, [dispatch, user, token]);

  const handleSearch = (searchQuery) => {
    console.log(searchQuery);
  };

  return (
    <div className="app-container" style={{ zIndex: 1 }}>
      <Navbar
        setOpenResubmitModal={undefined}
        setOpenSaveModal={undefined}
        setOpenSubmitModal={undefined}
        hasFormChanged={undefined}
        selectedPage={undefined}
      />
      <div className="content-container">
        <p className="title-page">My Applications</p>
        <p className="subtitle-page">
          Welcome to the Grant Application Portal.
        </p>

        <div>
          <div className="text-and-search-container">
            <div className="texts">
              <p className="text-1">Search through applications</p>
              <p className="text-2">
                Search by journalnr., grant, application name, status, or last
                activity.
              </p>
            </div>
            <SearchBarApplication onSearch={handleSearch} />
            <div className="dropdown-container">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={true}
                  // onChange={handleChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Completed</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <ApplicationTable data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default MyApplications;
