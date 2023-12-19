import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/layout.css";
import "../css/grants-page.css";
import Grant from "../components/grant";
import CategoryChips from "../components/category-chip";
import SearchBar from "../components/search-bar";

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
      <Navbar />
      <div className="content-container">
        <h1 className="title">Active Grants</h1>
        <h2 className="subtitle">
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
