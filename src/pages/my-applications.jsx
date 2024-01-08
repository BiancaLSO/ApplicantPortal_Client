import React, { useState, useEffect } from "react";
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
import { getUserDetails } from "../redux/auth/authSlice";
import { getApplicationByUserId } from "../redux/application/applicationSlice";

const MyApplications = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const applications = useSelector((state) => state.application.applications);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(true);

  useEffect(() => {
    if (user) {
      const userId = user.id;
      dispatch(getApplicationByUserId({ userId, token }));
      console.log(applications);
    }
  }, [dispatch, user, token]);

  useEffect(() => {
    setFilteredApplications(applications);
  }, [applications]);

  const handleSearch = (searchQuery) => {
    const filteredApplications = applications.filter((application) => {
      const matchesSearch =
        application.id.toString().includes(searchQuery) ||
        (application.grant &&
          application.grant.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (application.status &&
          application.status.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = application.isActive === selectedStatus;

      return matchesSearch && matchesStatus;
    });
    setFilteredApplications(filteredApplications);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    // Filter applications based on the new status
    const filteredApplications = applications.filter((application) => {
      return application.isActive === newStatus;
    });

    setFilteredApplications(filteredApplications);
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
              <p className="text-2">Search by journalnr., grant, or status.</p>
            </div>
            <SearchBarApplication onSearch={handleSearch} />
            <div className="dropdown-container">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={true}
                  onChange={handleStatusChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Completed</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <ApplicationTable data={filteredApplications} />
      </div>
      <Footer />
    </div>
  );
};

export default MyApplications;
