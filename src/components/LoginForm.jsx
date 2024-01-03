import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Checkbox, FormControlLabel, TextField, styled } from "@mui/material";

import "../css/login.css";

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

export default function LoginForm({ onSubmitForm }) {
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
    onsubmit: (values, { resetForm }) => {
      resetForm();
      console.log(values);
    },
  });

  if (userDetails) {
    if (userDetails.email) formik.initialValues.email = userDetails.email;
    if (userDetails.password)
      formik.initialValues.password = userDetails.password;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: "3rem",
        marginLeft: "3rem",
        marginTop: "3rem",
      }}
    >
      {/* <div>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 400,
            color: "#2b2b2b",
          }}
        >
          Login to the Grant portal to apply or communicate with us about your
          application Please use a 'user login' to the Grant Portal if you are
          not entitled to a nemlog-in (Denmark's national authentication
          service), for example, if you are a foreign applicant. Order the login
          on SLKS.dk
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 400,
            color: "#2b2b2b",
          }}
        >
          Remember to close your internet browser when logging out, to protect
          your personal information.
        </p>
      </div> */}
      <div>
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
      <div className="form-div">
        <h2 className="sec-title" style={{ fontWeight: "500" }}>
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form-row">
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
                style={{ margin: "1rem", width: "35rem" }}
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
                style={{ margin: "1rem", width: "35rem" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "3 rem",
              }}
            >
              <button className="btn login" type="submit">
                LOG IN
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
