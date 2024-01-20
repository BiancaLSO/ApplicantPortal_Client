import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import "../css/layout.css";
import MyProfileForm from "../components/MyProfileForm";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/auth/authSlice";

export default function MyProfile({ user }) {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);

  const submitForm = (values) => {
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      cpr: values.cpr,
      email: values.email,
    };

    const addressData = {
      street: values.street,
      city: values.city,
      zipCode: values.zipCode,
    };

    dispatch(
      editUser({
        userId: user.id,
        userBody: userData,
        addressBody: addressData,
      })
    );
    setIsSaved(true);
  };
  return (
    <div className="app-container">
      <Navbar
        setOpenResubmitModal={undefined}
        setOpenSaveModal={undefined}
        setOpenSubmitModal={undefined}
        hasFormChanged={undefined}
        selectedPage={undefined}
      />

      <div className="content-container">
        <MyProfileForm onSubmitForm={submitForm} userDetails={user} />
      </div>

      <Footer
        setOpenResubmitModal={undefined}
        setOpenSaveModal={undefined}
        setOpenSubmitModal={undefined}
        hasFormChanged={undefined}
        selectedPage={undefined}
      />
    </div>
  );
}
