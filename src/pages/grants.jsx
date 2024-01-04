import React from "react";
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
  const grants = useSelector((state) => state.grants);
  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getCategories({ token }));
  }, [dispatch, token]);

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
          {grants.length > 0 ? (
            grants.map((grant) => <Grant key={grant.id} grant={grant} />)
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
