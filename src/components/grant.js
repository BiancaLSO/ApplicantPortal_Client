import React, { useState } from "react";
import "../css/grant.css";

const Grant = ({ grant }) => {
  const [selectedGrant, setSelectedGrant] = useState([]);

  const toggleGrant = (grant) => {
    const isSelected = selectedGrant.includes(grant);
    setSelectedGrant((prevSelectedGrant) => {
      if (isSelected) {
        return prevSelectedGrant.filter((box) => box !== grant);
      } else {
        return [...prevSelectedGrant, grant];
      }
    });
  };

  return (
    <div className="grant-card" onClick={() => toggleGrant(grant)}>
      <div className="grant-left">
        <p className="grant-title">{grant.title}</p>
        <a href="#" className="requirements-link">
          Read More About Requirements
        </a>
      </div>
      <div className="grant-right">
        <button className="apply-button">APPLY HERE</button>
        <p className="active-until">Active until {grant.endDate}</p>
      </div>
    </div>
  );
};

export default Grant;
