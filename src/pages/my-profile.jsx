import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import "../css/layout.css"; // Import your custom styles
import MyProfileForm from "../components/MyProfileForm";

export default function MyProfile({ refetch }) {
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    refetch();
    fetchUserData();
  }, [user]);

  const submitForm = (values) => {
    console.log(values);

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

    // Updated fetch calls with JSON.stringify for the body
    fetch(`http://localhost:3005/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then(() =>
        fetch(`http://localhost:3005/address/${user.address.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        })
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsSaved(true);
      })
      .catch((err) => {
        console.error(err);
        // Handle errors
      });
  };
  return (
    <div className="app-container">
      <Navbar />

      <div className="content-container">
        <MyProfileForm onSubmitForm={submitForm} userDetails={user} />
      </div>

      <Footer />
    </div>
  );
}
