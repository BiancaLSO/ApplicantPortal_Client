import React, { useEffect, useState } from "react";
import "../css/activity-table.css";
import DoubleArrowR from "../images/double_right.svg";
import DoubleArrowL from "../images/double_left.svg";
import ArrowR from "../images/single_right.svg";
import ArrowL from "../images/single_left.svg";

const headers = [
  { name: "Message", key: "note" },
  { name: "Activity Name", key: "name" },
  { name: "Activity Date", key: "date" },
  { name: "Activity Details", key: "status" },
  { name: "Attachments", key: "attachments" },
];
let itemsPerPageOptions = [5, 10, 20];

export default function ActivityTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="form-div">
      <h2 className="sec-title" style={{ fontWeight: "500" }}>
        Activity Log
      </h2>
      <p className="sec-subtitle">
        Here you will be able to the list of all activities done on your
        application.
      </p>
      <div style={{ marginTop: "3rem" }}>
        <div className="tb-header-row">
          {headers.map((header) => (
            <div key={header.name} className="tb-header">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#2b2b2b",
                }}
              >
                {header.name}
              </p>
            </div>
          ))}
        </div>
        <div className="tb-column">
          {currentItems
            .sort((a, b) => b.id - a.id)
            .map((item, index) => (
              <div className="tb-row" key={index}>
                {headers.map((header) => (
                  <div className="tb-cell" key={header.key}>
                    <p
                      style={{
                        fontWeight: "300",
                        fontSize: "1.2rem",
                        fontFamily: "Red Hat Display",
                        alignSelf: "center",
                        color: "#2b2b2b",
                      }}
                    >
                      {header.key !== "status"
                        ? item[header.key]
                        : item[header.key]?.name}
                    </p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: "500" }}>Show</p>
          <select
            style={{
              padding: "0.3rem",
              borderColor: "#C0002A",
              outlineColor: "#C0002A",
              borderStyle: "solid",
              borderWidth: 2,
              borderRadius: 10,
              fontSize: "0.9rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>items per page</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            marginBottom: -5,
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 2)}
            disabled={currentPage === 1 || currentPage === 2}
            style={{
              borderStyle: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            className="arr"
          >
            <img src={DoubleArrowL} alt="Left double arrow svg" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              borderStyle: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <img src={ArrowL} alt="Left arrow svg" />
          </button>
          <span
            style={{
              fontSize: "1.4rem",
              marginLeft: "0.4rem",
              marginRight: "0.4rem",
              marginBottom: 4,
            }}
          >
            {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              borderStyle: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <img src={ArrowR} alt="Right arrow svg" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 2)}
            disabled={
              currentPage === totalPages || currentPage === totalPages - 1
            }
            style={{
              borderStyle: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <img src={DoubleArrowR} alt="Right double arrow svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
