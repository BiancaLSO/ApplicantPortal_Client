import React from "react";
import "../css/search-bar.css";

const SearchBarApplication = ({ placeholder }) => {
  return (
    <div className="search-application-container">
      <input className="searchbar" type="text" placeholder={placeholder} />
      <span className="material-icons">search</span>
    </div>
  );
};

export default SearchBarApplication;
