import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../css/my-profile.css";
import { Checkbox, FormControlLabel, TextField, styled } from "@mui/material";

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

export default function MyProfileForm({ onSubmitForm }) {
  const [userDetails, setUserDetails] = useState(null);

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

  return (
    <div className="form-div">
      <h2 className="sec-title" style={{ fontWeight: "500" }}>
        Application form
      </h2>
      <p className="sec-subtitle">subtitle</p>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-row">
          <div>
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
              style={{ margin: "1rem", width: "35rem" }}
            />

            <CssTextField
              id="lastName"
              name="lastName"
              label="Last name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              style={{ margin: "1rem", width: "35rem" }}
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
              style={{ margin: "1rem", width: "35rem" }}
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
              style={{ margin: "1rem", width: "35rem" }}
            />
          </div>

          <div className="justify first-step-align">
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
              style={{ margin: "1rem", width: "35rem" }}
            />
          </div>
          <div>
            <div>
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
                style={{ margin: "1rem", width: "35rem" }}
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
                style={{ margin: "1rem", width: "35rem" }}
              />

              <CssTextField
                id="zipCode"
                name="zipCode"
                label="Zip code"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
                style={{ margin: "1rem", width: "35rem" }}
              />
            </div>
            <button className="btn submit" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
