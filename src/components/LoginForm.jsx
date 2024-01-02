import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { Checkbox, FormControlLabel, TextField, styled } from "@mui/material";

import "../css/login.css";
import PhoneIcon from "../images/contact-us.svg";
import LogoIcon from "../images/logo2.svg";
import { login } from "../redux/auth/authSlice";

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

export default function LoginForm({ onSubmitForm, userDetails }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("hello", values);
      onSubmitForm(values);
      resetForm();
      console.log(values);
    },
  });

  return (
    <>
      <div className="login-form">
        <form onSubmit={formik.handleSubmit}>
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
                helperText={formik.touched.password && formik.errors.password}
                style={{
                  marginLeft: "2rem",
                  width: "25rem",
                  marginBottom: "2rem",
                }}
              />
            </div>
          </div>
          <div className="form-button-div">
            <button className="button" type="submit">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
