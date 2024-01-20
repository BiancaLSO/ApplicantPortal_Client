import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, styled } from "@mui/material";

import "../css/signup.css";

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

export default function SignUpForm({ onSubmitSignUpForm }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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

      username: Yup.string().required("Required"),

      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),

      street: Yup.string().required("Required"),
      city: Yup.string()
        .matches(/^[a-zA-ZæøåÆØÅ\s-]+$/, "Must be a valid Danish city name")
        .required("Required"),
      zipCode: Yup.string()
        .matches(/^[0-9]{4}$/, "Must be a valid Danish zip code")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmitSignUpForm(values);
      resetForm();
    },
  });

  return (
    <>
      <div className="mitid-form">
        <form onSubmit={formik.handleSubmit}>
          <div className="mitid-fields">
            <h2 className="form-title">MitID Sign Up</h2>
            <div className="form-container">
              <div className="mitid-column">
                <div>
                  <CssTextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    style={{
                      marginTop: "1rem",
                      width: "20rem",
                    }}
                  />
                </div>
                <div>
                  <CssTextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
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
                      marginTop: "1rem",
                      width: "20rem",
                    }}
                  />
                </div>
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
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    style={{
                      marginTop: "1rem",
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
                      width: "20rem",
                    }}
                  />
                </div>
              </div>

              <div className="mitid-column">
                <div>
                  <CssTextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    style={{
                      marginTop: "1rem",
                      width: "20rem",
                    }}
                  />
                </div>
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
                      marginTop: "1rem",
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
                    helperText={formik.touched.street && formik.errors.street}
                    style={{
                      marginTop: "1rem",
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
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    style={{
                      marginTop: "1rem",
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
                      formik.touched.zipCode && Boolean(formik.errors.zipCode)
                    }
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                    style={{
                      marginTop: "1rem",
                      width: "20rem",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-button-div">
              <button
                className="signup-button"
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
                  !formik.values.zipCode
                }
              >
                SIGN UP
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
