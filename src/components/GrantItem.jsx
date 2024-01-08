import React from "react";
import "../css/grant.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Grant = ({ grant }) => {
  const navigate = useNavigate();
  const createApplication = (id) => {
    navigate("/applications/details", {
      state: {
        grantId: id,
        applicationId: undefined,
        defaultPage: "form",
      },
    });
  };
  return (
    <div className="grant-card">
      <div className="grant-left">
        <p className="grant-title">{grant.title}</p>
        <a href={grant.link} className="requirements-link">
          Read More About Requirements
        </a>
      </div>
      <div className="grant-right">
        <button
          className="apply-button"
          onClick={() => createApplication(grant.id)}
        >
          APPLY HERE
        </button>
        <p className="active-until">
          Active until {moment(grant.end_date).format("DD/MM/YYYY [at] HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default Grant;
