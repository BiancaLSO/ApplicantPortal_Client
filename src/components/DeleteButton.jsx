import React from "react";
import Trashcan from "../images/trash_can.svg";

import "../css/delete-button.css"; // Import your custom styles

export default function DeleteButton() {
  return (
    <button className="button">
      <p>ARCHIVE APPLICATION</p>
      <img style={{ marginTop: "-0.2rem" }} src={Trashcan} alt="Trashcan svg" />
    </button>
  );
}
