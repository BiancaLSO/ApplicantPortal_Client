import React from "react";
import "../css/search-bar.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBarApplication = () => {
  return (
    <div className="search-application-container">
      <TextField
        label=""
        size="small"
        placeholder="Search"
        fullWidth="true"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span className="material-icons">search</span>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBarApplication;
