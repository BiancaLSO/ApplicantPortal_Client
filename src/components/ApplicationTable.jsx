import React, { useState } from "react";
import "../css/application-table.css";
import DoubleArrowR from "../images/double_right.svg";
import DoubleArrowL from "../images/double_left.svg";
import ArrowR from "../images/single_right.svg";
import ArrowL from "../images/single_left.svg";

const headers = [
  { name: "JournalNr.", key: "journalNr" },
  { name: "Application Name", key: "applicationName" },
  { name: "Grant", key: "grant" },
  { name: "Status", key: "status" },
  { name: "Last Activity", key: "lastActivity" },
  { name: "", key: "iconColumn" },
];
let itemsPerPageOptions = [5, 10, 20];

export default function ApplicationTable({ data }) {
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
      <div className="form-div-top">
        <div className="tb-header-row-application">
          {headers.map((header) => (
            <div key={header.name} className="tb-header-application">
              <p className="header-name">{header.name}</p>
            </div>
          ))}
        </div>
        <div className="tb-column-application">
          {currentItems.map((item, index) => (
            <div className="tb-row-application" key={index}>
              {headers.map((header) => (
                <div className="tb-cell-application" key={header.key}>
                  {header.key === "iconColumn" ? (
                    <span class="material-symbols-outlined edit-icon-container">
                      edit_square
                    </span>
                  ) : (
                    <p className="tb-cell-text">
                      {header.key !== "status"
                        ? item[header.key]
                        : item[header.key]?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <div className="pagination-container">
          <p className="pagination-text">Show</p>
          <select
            className="pagination-select"
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
        <div className="pagination-arrows-container">
          <button
            onClick={() => handlePageChange(currentPage - 2)}
            disabled={currentPage === 1 || currentPage === 2}
            className="arr pagination-button"
          >
            <img src={DoubleArrowL} alt="Left double arrow svg" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <img src={ArrowL} alt="Left arrow svg" />
          </button>
          <span className="pagination-current">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <img src={ArrowR} alt="Right arrow svg" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 2)}
            disabled={
              currentPage === totalPages || currentPage === totalPages - 1
            }
            className="pagination-button"
          >
            <img src={DoubleArrowR} alt="Right double arrow svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
