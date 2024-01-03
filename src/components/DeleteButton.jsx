import React from "react";
import Trashcan from "../images/trash_can.svg";

import "../css/delete-button.css"; // Import your custom styles
import { useDispatch, useSelector } from "react-redux";
import { archiveApplication } from "../redux/application/applicationSlice";

export default function DeleteButton() {
  const dispatch = useDispatch();
  const applicationId = useSelector((state) => state.application.applicationId);
  const token = useSelector((state) => state.auth.token);
  const archive = (id) => {
    const body = { value: false };
    dispatch(
      archiveApplication({
        applicationId: id,
        value: body,
        token,
      })
    );
  };
  return (
    <button
      className="button"
      onClick={() => {
        archive(applicationId);
      }}
    >
      <p>ARCHIVE APPLICATION</p>
      <img style={{ marginTop: "-0.2rem" }} src={Trashcan} alt="Trashcan svg" />
    </button>
  );
}
