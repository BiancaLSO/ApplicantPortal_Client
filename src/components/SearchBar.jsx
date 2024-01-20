import React, { useState } from "react";
import "../css/search-bar.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <TextField
        label=""
        size="small"
        placeholder="Search"
        fullWidth
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
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

export default SearchBar;
