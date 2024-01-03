import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/layout.css";
import "../css/my-applications-page.css";
import SearchBarApplication from "../components/SearchBarApplication";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ApplicationTable from "../components/ApplicationTable";

const data = [
  { name: "JournalNr.", key: "note" },
  { name: "Application Name", key: "name" },
  { name: "Grant", key: "date" },
  { name: "Status", key: "status" },
  { name: "Last Activity", key: "attachments" },
];

const MyApplications = () => {
  return (
    <div className="app-container">
      <Navbar />
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
            <SearchBarApplication />
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
