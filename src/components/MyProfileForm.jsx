import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../css/my-profile.css";
import { Checkbox, FormControlLabel, TextField, styled } from "@mui/material";
import ProfileIcon from "../images/profile.svg";
import PhoneIcon from "../images/phone.svg";

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

export default function MyProfileForm({ onSubmitForm, userDetails }) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      cpr: "",
      email: "",
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
    formik.values.street !== userDetails?.address?.street ||
    formik.values.city !== userDetails?.address?.city ||
    formik.values.zipCode !== userDetails?.address?.zipCode;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "3rem",
      }}
    >
      <div>
        <img src={ProfileIcon} alt="Profile placeholder img" />
        <div>
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.1rem" }}>Write to us :</p>
            <a href="mailto:tilskudsportal@slks.dk" className="a">
              Tilskudsportal@slks.dk
            </a>
          </div>
          <div>
            <p style={{ fontSize: "1.1rem" }}>Contact us :</p>
            <div
              style={{
                display: "flex",
                fontWeight: "500",
                fontSize: "1.2rem",
                gap: "2rem",
                marginTop: "-1.7rem",
              }}
            >
              <p>Mon - Fri :</p>
              <p>08:00 - 17:00</p>
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: "500",
                fontSize: "1.2rem",
                gap: "2rem",
                marginTop: "-2rem",
              }}
            >
              <p>Sat - Sun :</p>
              <p>09:00 - 13:00</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#c0002a",
                  borderRadius: "100%",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={PhoneIcon}
                  alt="Profile placeholder img"
                  style={{
                    padding: "0.6rem",
                    width: "2.3rem",
                    height: "2rem",
                  }}
                />
              </div>
              <a
                href="tel:+45 33 95 42 00"
                className="a"
                style={{ paddingBottom: "0.6rem" }}
              >
                +45 33 95 42 00
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form-row">
            <div className="form-sec">
              <CssTextField
                id="firstName"
                name="firstName"
                label="First name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                style={{ margin: "1rem", width: "23rem" }}
              />

              <CssTextField
                id="lastName"
                name="lastName"
                label="Last name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                style={{ margin: "1rem", width: "23rem" }}
              />

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
                style={{ margin: "1rem", width: "23rem" }}
              />

              <CssTextField
                id="phone"
                name="phone"
                label="Phone number"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                style={{ margin: "1rem", width: "23rem" }}
              />

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
                style={{ margin: "1rem", width: "23rem" }}
              />
            </div>
            <div className="space-btw">
              <div className="form-sec">
                <CssTextField
                  id="street"
                  name="street"
                  label="Street"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  error={formik.touched.street && Boolean(formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                  style={{ margin: "1rem", width: "23rem" }}
                />

                <CssTextField
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  style={{ margin: "1rem", width: "23rem" }}
                />

                <CssTextField
                  id="zipCode"
                  name="zipCode"
                  label="Zip code"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zipCode}
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                  style={{ margin: "1rem", width: "23rem" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="btn submit"
                  type="submit"
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
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
