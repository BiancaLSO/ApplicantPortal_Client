import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/layout.css";
import "../css/grants-page.css";
import Grant from "../components/GrantItem";
import CategoryChips from "../components/CategoryChip";
import SearchBar from "../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getGrants } from "../redux/grant/grantSlice";
import { useEffect } from "react";
import { getCategories } from "../redux/category/categorySlice";

const Grants = () => {
  const dispatch = useDispatch();
  const grants = useSelector((state) => state.grants.grants);
  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.auth.token);
  const [searchedGrants, setSearchedGrants] = useState(grants);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCategories({ token }));
    dispatch(getGrants({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    setSearchedGrants(grants);
  }, [grants]);

  const handleSearch = (searchQuery) => {
    const searched = grants.filter((grant) =>
      grant.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedGrants(searched);
  };

  const handleCategorySelect = (selectedChips) => {
    setSelectedCategories(selectedChips);
  };

  useEffect(() => {
    const filteredGrants = grants.filter((grant) => {
      const matchesSearch =
        grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === "";

      const matchesCategories =
        selectedCategories.length === 0 ||
        (grant.category &&
          selectedCategories.some((category) =>
            grant.category.name
              .toLowerCase()
              .includes(category.name.toLowerCase())
          ));

      return matchesSearch && matchesCategories;
    });

    setSearchedGrants(filteredGrants);
  }, [searchQuery, selectedCategories, grants]);

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

        <SearchBar onSearch={handleSearch} />

        <CategoryChips
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />

        <div className="grants-list">
          {searchedGrants.length > 0 ? (
            searchedGrants.map((grant) => (
              <Grant key={grant.id} grant={grant} />
            ))
          ) : (
            <p>No grants available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Grants;
