import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/layout.css";
import "../css/grants-page.css";
import Grant from "../components/GrantItem";
import CategoryChips from "../components/CategoryChip";
import SearchBar from "../components/SearchBar";

const Grants = () => {
  const activeGrants = [
    {
      id: 1,
      title:
        "Special education support for folk high schools (SPS): Apply for grants for people with severe disabilities 2023",
      category: "Technology",
      endDate: "2023-01-02",
    },
    {
      id: 2,
      title:
        "Special education support for folk high schools (SPS): Apply for grants for people with severe disabilities 2023",
      category: "Education",
      endDate: "2023-01-02",
    },
    {
      id: 3,
      title:
        "Special education support for folk high schools (SPS): Apply for grants for people with severe disabilities 2023",
      category: "Education",
      endDate: "2023-01-02",
    },
    {
      id: 4,
      title:
        "Special education support for folk high schools (SPS): Apply for grants for people with severe disabilities 2023",
      category: "Education",
      endDate: "2023-01-02",
    },
  ];

  const categories = [
    "Education",
    "Design&Crafts",
    "Visual Arts",
    "Research",
    "Documentation",
  ];

  return (
    <div className="app-container">
      <NavBar
        setOpenResubmitModal={undefined}
        setOpenSaveModal={undefined}
        setOpenSubmitModal={undefined}
        hasFormChanged={undefined}
        selectedPage={undefined}
      />
      <div className="content-container">
        <h1 className="title-grants">Active Grants</h1>
        <h2 className="subtitle-grants">
          Choose and apply for one of the currently active grants.
        </h2>

        <SearchBar />

        <CategoryChips categories={categories} />

        <div className="grants-list">
          {activeGrants.map((grant) => (
            <Grant key={grant.id} grant={grant} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Grants;
