import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Checkbox, FormControlLabel, TextField, styled } from "@mui/material";

import "../css/login.css";
import PhoneIcon from "../images/phone.svg";
import LogoIcon from "../images/logo.svg";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#2B2B2B",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "Red Hat Display",
    fontWeight: "bold",
    "& fieldset": {
      borderColor: "#D3D0D0",
      color: "#2B2B2B",
    },
    "&:hover fieldset": {
      borderColor: "#4F4E50",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#BF0436",
    },
  },
  "& label": {
    fontFamily: "Red Hat Display",
    fontWeight: "600",
  },
  "& fieldset": {
    borderRadius: "10px",
  },
}));

export default function LoginForm({ onSubmitForm }) {
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("User");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserDetails(JSON.parse(storedUser));
      }
    };
    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      cpr: "",
      email: "",
      password: "",
      street: "",
      city: "",
      zipCode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(
          /^[A-Za-z]+$/,
          "Must be a string with alphabetical characters only"
        )
        .required("Required"),
      lastName: Yup.string()
        .matches(
          /^[A-Za-z]+$/,
          "Must be a string with alphabetical characters only"
        )
        .required("Required"),
      phone: Yup.string()
        .matches(/^\+45\d{8}$|^\d{8}$/, "Must be a valid Danish phone number")
        .required("Required"),
      cpr: Yup.string()
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{2}-\d{4}$/,
          "Must be a valid Danish CPR number"
        )
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      street: Yup.string().required("Required"),
      city: Yup.string()
        .matches(/^[a-zA-ZæøåÆØÅ\s-]+$/, "Must be a valid Danish city name")
        .required("Required"),
      zipCode: Yup.string()
        .matches(/^[0-9]{4}$/, "Must be a valid Danish zip code")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmitForm(values);
      resetForm();
      console.log(values);
    },
  });

  if (userDetails) {
    if (userDetails.firstName)
      formik.initialValues.firstName = userDetails.firstName;
    if (userDetails.lastName)
      formik.initialValues.lastName = userDetails.lastName;
    if (userDetails.cpr) formik.initialValues.cpr = userDetails.cpr;
    if (userDetails.phone) formik.initialValues.phone = userDetails.phone;
    if (userDetails.email) formik.initialValues.email = userDetails.email;
    if (userDetails.password)
      formik.initialValues.password = userDetails.password;
    if (userDetails.address.street)
      formik.initialValues.street = userDetails.address.street;
    if (userDetails.address.city)
      formik.initialValues.city = userDetails.address.city;
    if (userDetails.address.zipCode)
      formik.initialValues.zipCode = userDetails.address.zipCode;
  }

  const isFormChanged =
    formik.values.firstName !== userDetails?.firstName ||
    formik.values.lastName !== userDetails?.lastName ||
    formik.values.cpr !== userDetails?.cpr ||
    formik.values.phone !== userDetails?.phone ||
    formik.values.email !== userDetails?.email ||
    formik.values.password !== userDetails?.password ||
    formik.values.street !== userDetails?.address?.street ||
    formik.values.city !== userDetails?.address?.city ||
    formik.values.zipCode !== userDetails?.address?.zipCode;

  return (
    <>
      <div className="top-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "MitID" ? "active" : ""}`}
            onClick={() => handleTabClick("MitID")}
          >
            {" "}
            MitID LOGIN
          </div>
          <div
            className={`tab ${activeTab === "User" ? "active" : ""}`}
            onClick={() => handleTabClick("User")}
          >
            USER LOGIN
          </div>
        </div>

        <div className="text-box">
          <p className="text-box-paragraph">
            Login to the Grant portal to apply or communicate with us about your
            application, please use a 'USER LOGIN' to the Grant Portal if you
            are already registered, otherwise to register use MitID LOGIN
            (Denmark's national authentication service), for example, if you are
            a foreign applicant. Order the login on SLKS.dk
          </p>
          <p className="text-box-paragraph">
            Remember to close your internet browser when logging out, to protect
            your personal information.
          </p>
        </div>
      </div>

      <div
        className={`main-container ${
          activeTab === "MitID" ? "start" : "space-between"
        }`}
      >
        <div className="address-contact-div">
          <div className="address-div">
            <img
              loading="lazy"
              src={LogoIcon}
              alt="logo"
              className="img-logo"
            />
            <div className="address-title">
              Slots- og Kulturstyrelsen / Ministry of Culture and Palaces
            </div>
            <div className="address-address">
              Hammerichsgade 14, DK
              <br />
              1611 København V
            </div>
          </div>

          <div className="contact-div">
            <div className="contact-div-title">Write to us :</div>
            <div className="contact-div-link">Tilskudsportal@slks.dk</div>
            <div className="contact-div-contact-us">Contact us :</div>
            <div className="contact-div-hours">
              Mon - Fri : 08:00 - 17:00
              <br />
            </div>
            <div className="contact-div-hours-text">
              Sat - Sun : 09:00 - 13:00
              <br />
            </div>
            <div className="contact-div-img-phone-text">
              <img
                loading="lazy"
                src={PhoneIcon}
                alt="phone"
                className="img-phone"
              />
              <div className="contact-div-phone-text">+45 33 95 42 00</div>
            </div>
          </div>
        </div>

        <div className={`form ${activeTab === "MitID" ? "mitid-form" : ""}`}>
          <form onSubmit={formik.handleSubmit}>
            {activeTab === "User" && (
              <div className="form-rows">
                <h2 className="form-title">Login</h2>
                <div>
                  <CssTextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    style={{
                      marginLeft: "2rem",
                      width: "25rem",
                    }}
                  />
                </div>
                <div>
                  <CssTextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    style={{
                      marginLeft: "2rem",
                      width: "25rem",
                      marginBottom: "2rem",
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === "MitID" && (
              <>
                <h2 className="form-title">MitID Sign Up</h2>
                <div className="mitid-fields">
                  <div className="mitid-column">
                    <div>
                      <CssTextField
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                    <div>
                      <CssTextField
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                    <div>
                      <CssTextField
                        id="cpr"
                        name="cpr"
                        label="CPR"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cpr}
                        error={formik.touched.cpr && Boolean(formik.errors.cpr)}
                        helperText={formik.touched.cpr && formik.errors.cpr}
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                    <div>
                      <CssTextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mitid-column">
                    <div>
                      <CssTextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                    <div>
                      <CssTextField
                        id="street"
                        name="street"
                        label="Street"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street}
                        error={
                          formik.touched.street && Boolean(formik.errors.street)
                        }
                        helperText={
                          formik.touched.street && formik.errors.street
                        }
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                    <div>
                      <CssTextField
                        id="city"
                        name="city"
                        label="City"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        error={
                          formik.touched.city && Boolean(formik.errors.city)
                        }
                        helperText={formik.touched.city && formik.errors.city}
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                    <div>
                      <CssTextField
                        id="zipCode"
                        name="zipCode"
                        label="Zip Code"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zipCode}
                        error={
                          formik.touched.zipCode &&
                          Boolean(formik.errors.zipCode)
                        }
                        helperText={
                          formik.touched.zipCode && formik.errors.zipCode
                        }
                        style={{
                          marginTop: "1rem",
                          marginLeft: "2rem",
                          width: "20rem",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="form-button-div">
              {activeTab === "MitID" && (
                <button className="button" type="submit">
                  SIGN UP
                </button>
              )}
              {activeTab === "User" && (
                <button
                  className="button"
                  type="login"
                  disabled={
                    Boolean(formik.errors.firstName) ||
                    Boolean(formik.errors.lastName) ||
                    Boolean(formik.errors.phone) ||
                    Boolean(formik.errors.cpr) ||
                    Boolean(formik.errors.email) ||
                    Boolean(formik.errors.street) ||
                    Boolean(formik.errors.city) ||
                    Boolean(formik.errors.zipCode) ||
                    !formik.values.firstName ||
                    !formik.values.lastName ||
                    !formik.values.cpr ||
                    !formik.values.phone ||
                    !formik.values.email ||
                    !formik.values.street ||
                    !formik.values.city ||
                    !formik.values.zipCode ||
                    !isFormChanged
                  }
                >
                  LOG IN
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
