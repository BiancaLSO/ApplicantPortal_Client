import React from "react";
import "../css/search-bar.css";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="search-container">
      <input className="searchbar" type="text" placeholder={placeholder} />
      <span className="material-icons">search</span>
    </div>
  );
};

export default SearchBar;
