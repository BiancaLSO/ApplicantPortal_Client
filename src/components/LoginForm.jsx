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

export default function LoginForm({ onSubmitLoginForm, userDetails }) {
  const [activeTab, setActiveTab] = useState("User");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("hello", values);
      onSubmitLoginForm(values);
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
                helperText={formik.touched.username && formik.errors.username}
                style={{
                  marginLeft: "2rem",
                  marginRight: "2rem",
                  width: "22rem",
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
                helperText={formik.touched.password && formik.errors.password}
                style={{
                  marginLeft: "2rem",
                  width: "22rem",
                  marginBottom: "3rem",
                }}
              />
            </div>
          </div>
          <div className="form-button-div">
            <button className="login-button" type="submit">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
