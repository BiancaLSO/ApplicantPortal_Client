import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../css/application-form.css";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  styled,
  DatePicker,
} from "@mui/material";
import Modal from "react-modal";
import moment from "moment";
import { useSelector } from "react-redux";

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

export default function ApplicationForm3({
  onSubmitForm,
  onResubmitForm,
  applicationDetails,
  applicationId,
  hasBeenSubmitted,
  setHasFormChanged,
  openSaveModal,
  openResubmitModal,
  setOpenSaveModal,
  setOpenResubmitModal,
  setSelectedPage,
  onUpdateForm,
  openSubmitModal,
  setOpenSubmitModal,
  onSaveApplication,
  userDetails,
}) {
  const [currentStep, setCurrentStep] = useState(
    applicationDetails ? Number(applicationDetails.form_step) : 1
  );
  const application = useSelector((state) => state.application.application);
  const grant = useSelector((state) => state.grants.grant);

  const isValidCountry = async (value) => {
    try {
      const response = await fetch("https://restcountries.com/v2/all");
      const countries = await response.json();
      const countryNames = countries.map((country) => country.name);

      return countryNames.includes(value);
    } catch (error) {
      console.error("Error fetching country data", error);
      return false;
    }
  };

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

      recedencyName: "",
      projectDescription: "",
      projectCountry: "",
      recedencyStartDate: moment().format("YYYY-MM-DD"),
      recedencyEndDate: moment().format("YYYY-MM-DD"),
      requestedAmount: 0,
      overallAmount: 0,
      formStep: currentStep,
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

      recedencyName: Yup.string()
        .required("Required")
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be at most 100 characters"),
      projectDescription: Yup.string()
        .required("Required")
        .min(100, "Must be at least 100 characters")
        .max(1000, "Must be at most 1000 characters"),
      projectCountry: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters")
        .max(100, "Must be at most 100 characters")
        .test("isValidCountry", "Invalid country", isValidCountry),

      recedencyStartDate: Yup.date()
        .required("Required")
        .min(
          new Date("2024-01-01"),
          "Date must be after or on January 01, 2024"
        )
        .max(
          new Date("2024-12-31"),
          "Date must be before or on December 31, 2024"
        ),

      recedencyEndDate: Yup.date()
        .required("Required")
        .min(Yup.ref("recedencyStartDate"), "End date must be after start date")
        .max(
          new Date("2024-12-31"),
          "Date must be before or on December 31, 2024"
        ),
      requestedAmount: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0")
        .integer("Must be a whole number"),

      overallAmount: Yup.number()
        .required("Required")
        .positive("Must be a positive number")
        .integer("Must be a whole number"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (hasBeenSubmitted) {
        values.formStep = currentStep;
        onResubmitForm(values);
      } else if (!hasBeenSubmitted && applicationId) {
        values.formStep = currentStep;
        onUpdateForm(values);
      } else {
        values.formStep = currentStep;
        const body = {
          values,
          submission: true,
        };
        onSubmitForm(body);
      }
      resetForm();
      setCurrentStep(1);
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

    if (applicationDetails) {
      if (applicationDetails.recedency_name)
        formik.initialValues.recedencyName = applicationDetails.recedency_name;
      if (applicationDetails.project_description)
        formik.initialValues.projectDescription =
          applicationDetails.project_description;
      if (applicationDetails.project_country)
        formik.initialValues.projectCountry =
          applicationDetails.project_country;
      if (applicationDetails.recedency_start_date)
        formik.initialValues.recedencyStartDate =
          applicationDetails.recedency_start_date;
      if (applicationDetails.recedency_end_date)
        formik.initialValues.recedencyEndDate =
          applicationDetails.recedency_end_date;
      if (applicationDetails.requested_amount)
        formik.initialValues.requestedAmount =
          applicationDetails.requested_amount;
      if (applicationDetails.overall_amount)
        formik.initialValues.overallAmount = applicationDetails.overall_amount;
    }
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isFormChanged =
    formik.values.recedencyName !== applicationDetails?.recedency_name ||
    formik.values.projectDescription !==
      applicationDetails?.project_description ||
    formik.values.projectCountry !== applicationDetails?.project_country ||
    formik.values.recedencyStartDate !==
      applicationDetails?.recedency_start_date ||
    formik.values.recedencyEndDate !== applicationDetails?.recedency_end_date ||
    formik.values.requestedAmount !== applicationDetails?.requested_amount ||
    formik.values.overallAmount !== applicationDetails?.overall_amount;

  useEffect(() => {
    setHasFormChanged(isFormChanged);
  }, [isFormChanged]);

  const saveProgress = (values) => {
    if (
      application &&
      application.activities !== null &&
      application.activities?.length > 0
    ) {
      if (
        values.recedencyName.length > 0 ||
        values.projectDescription.length > 0 ||
        values.projectCountry.length > 0
      ) {
        values.formStep = 2;
      } else {
        if (values.formStep === 2) {
          values.formStep = 1;
        } else {
          values.formStep = currentStep;
        }
      }
      onSaveApplication(values);
    } else {
      if (
        values.recedencyName.length > 0 ||
        values.projectDescription.length > 0 ||
        values.projectCountry.length > 0
      ) {
        values.formStep = 2;
      } else {
        if (values.formStep === 2) {
          values.formStep = 1;
        } else {
          values.formStep = currentStep;
        }
      }
      const body = {
        values,
        submission: false,
      };
      onSubmitForm(body);
    }
  };

  const customStyles = {
    content: {
      width: "50%",
      height: "25rem",
      margin: "auto",
      zIndex: 50,
      borderRadius: "10px",
    },
  };

  return (
    <div className="form-div">
      <h2 className="sec-title" style={{ fontWeight: "500" }}>
        Application form
      </h2>
      <p className="sec-subtitle">{grant && grant.title}</p>
      <form onSubmit={formik.handleSubmit} className="form">
        {currentStep === 1 && (
          <div className="form-row">
            <div className="justify first-step-align">
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
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
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
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="form-row">
              <div className="">
                <CssTextField
                  id="recedencyName"
                  name="recedencyName"
                  label="Residency name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recedencyName}
                  error={
                    formik.touched.recedencyName &&
                    Boolean(formik.errors.recedencyName)
                  }
                  helperText={
                    formik.touched.recedencyName && formik.errors.recedencyName
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="projectCountry"
                  name="projectCountry"
                  label="Project country"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.projectCountry}
                  error={
                    formik.touched.projectCountry &&
                    Boolean(formik.errors.projectCountry)
                  }
                  helperText={
                    formik.touched.projectCountry &&
                    formik.errors.projectCountry
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="projectDescription"
                  name="projectDescription"
                  label="Project description"
                  multiline
                  rows={7}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.projectDescription}
                  error={
                    formik.touched.projectDescription &&
                    Boolean(formik.errors.projectDescription)
                  }
                  helperText={
                    formik.touched.projectDescription &&
                    formik.errors.projectDescription
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />
              </div>

              <div className="justify">
                <CssTextField
                  id="recedencyStartDate"
                  name="recedencyStartDate"
                  label="Residency start date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recedencyStartDate}
                  error={
                    formik.touched.recedencyStartDate &&
                    Boolean(formik.errors.recedencyStartDate)
                  }
                  helperText={
                    formik.touched.recedencyStartDate &&
                    formik.errors.recedencyStartDate
                  }
                  inputProps={{
                    min: new Date("2024-01-01").toISOString().split("T")[0],
                    max: "2024-12-31",
                  }}
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="recedencyEndDate"
                  name="recedencyEndDate"
                  label="Residency end date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recedencyEndDate}
                  error={
                    formik.touched.recedencyEndDate &&
                    Boolean(formik.errors.recedencyEndDate)
                  }
                  helperText={
                    formik.touched.recedencyEndDate &&
                    formik.errors.recedencyEndDate
                  }
                  inputProps={{
                    min: formik.values.recedencyStartDate,
                    max: "2024-12-31",
                  }}
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="requestedAmount"
                  name="requestedAmount"
                  label="Requested amount"
                  type="number"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.requestedAmount}
                  error={
                    formik.touched.requestedAmount &&
                    Boolean(formik.errors.requestedAmount)
                  }
                  helperText={
                    formik.touched.requestedAmount &&
                    formik.errors.requestedAmount
                  }
                  style={{
                    margin: "1rem",
                    width: "35rem",
                  }}
                  inputProps={{
                    step: 1,
                  }}
                />

                <CssTextField
                  id="overallAmount"
                  name="overallAmount"
                  label="Overall amount"
                  type="number"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.overallAmount}
                  error={
                    formik.touched.overallAmount &&
                    Boolean(formik.errors.overallAmount)
                  }
                  helperText={
                    formik.touched.overallAmount && formik.errors.overallAmount
                  }
                  style={{
                    margin: "1rem",
                    width: "35rem",
                  }}
                  inputProps={{
                    step: 1,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3
              style={{
                fontSize: "1.6rem",
                fontWeight: "500",
                padding: "2rem",
              }}
            >
              Application summary
            </h3>
            <div className="summary-row">
              <div style={{ marginTop: "-2rem" }}>
                <h4
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    color: "#C0002A",
                  }}
                >
                  Personal information
                </h4>
                <div>
                  <p style={{ fontWeight: "600" }}>Applicant full name:</p>
                  <p style={{ fontSize: "1.3rem", marginTop: "-0.7rem" }}>
                    {formik.values.firstName} {formik.values.lastName}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>CPR number:</p>
                  <p style={{ fontSize: "1.3rem", marginTop: "-0.7rem" }}>
                    {formik.values.cpr}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Phone number:</p>
                  <p style={{ fontSize: "1.3rem", marginTop: "-0.7rem" }}>
                    {formik.values.phone}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Email address:</p>
                  <p style={{ fontSize: "1.3rem", marginTop: "-0.7rem" }}>
                    {formik.values.email}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Full address:</p>
                  <p style={{ fontSize: "1.3rem", marginTop: "-0.7rem" }}>
                    {formik.values.street},<br />
                    {formik.values.zipCode} {formik.values.city}
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "-2rem" }}>
                <h4
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    color: "#C0002A",
                  }}
                >
                  Project information
                </h4>
                <div>
                  <p style={{ fontWeight: "600" }}>Residency name:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.recedencyName}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    The country where project is held in:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.projectCountry}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    Description of your project:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.projectDescription}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Residency start date:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {new Date(
                      formik.values.recedencyStartDate
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Residency end date:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {new Date(
                      formik.values.recedencyEndDate
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>The amount you requested:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.requestedAmount}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    The overall amount needed:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.overallAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="step-buttons">
          {currentStep === 1 && <div></div>}

          {currentStep !== 1 && (
            <button className="btn previous" type="button" onClick={prevStep}>
              PREVIOUS
            </button>
          )}

          {currentStep === 1 && (
            <button
              className="btn next"
              type="button"
              onClick={nextStep}
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
              NEXT
            </button>
          )}

          {currentStep === 2 && (
            <button
              className="btn next"
              type="button"
              onClick={nextStep}
              disabled={
                Boolean(formik.errors.recedencyName) ||
                Boolean(formik.errors.projectDescription) ||
                Boolean(formik.errors.projectCountry) ||
                Boolean(formik.errors.recedencyStartDate) ||
                Boolean(formik.errors.recedencyEndDate) ||
                Boolean(formik.errors.requestedAmount) ||
                Boolean(formik.errors.overallAmount) ||
                !formik.values.recedencyName ||
                !formik.values.projectDescription ||
                !formik.values.projectCountry ||
                !formik.values.recedencyStartDate ||
                !formik.values.recedencyEndDate ||
                !formik.values.requestedAmount ||
                !formik.values.overallAmount
              }
            >
              NEXT
            </button>
          )}

          {currentStep === 3 && hasBeenSubmitted && (
            <button
              className="btn submit"
              type="submit"
              disabled={!isFormChanged}
            >
              RESUBMIT
            </button>
          )}

          {currentStep === 3 && applicationId === undefined && (
            <button className="btn submit" type="submit">
              SUBMIT
            </button>
          )}
          {currentStep === 3 && !hasBeenSubmitted && applicationId && (
            <button className="btn submit" type="submit">
              SUBMIT
            </button>
          )}
        </div>
      </form>
      <Modal
        isOpen={openSaveModal}
        onRequestClose={() => setOpenSaveModal(false)}
        contentLabel="Save Modal"
        style={customStyles}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem 2rem 0 2rem",
          }}
        >
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          >
            Would you like to save your progress?
          </h3>
          <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
            We can see you haven't submitted the application. Would you like to
            save this application draft and work on it later, or just descard
            it?
          </p>
          <div className="popup-btns">
            <button
              style={{ backgroundColor: "#c0002a", color: "white" }}
              onClick={() => saveProgress(formik.values)}
              className="popup-btn"
            >
              Yes, save my progress.
            </button>
            <button
              style={{
                backgroundColor: "EFEFE9",
                color: "#c0002a",
                outlineColor: "#c0002a",
                outlineStyle: "#c0002a",
                outlineWidth: 2,
              }}
              onClick={() => setOpenSaveModal(false)}
              className="popup-btn"
            >
              Countinue form fillout
            </button>
            <button
              style={{
                backgroundColor: "EFEFE9",
                color: "#c0002a",
                outlineColor: "#c0002a",
                outlineStyle: "#c0002a",
                outlineWidth: 2,
              }}
              onClick={() => {
                setOpenSaveModal(false);
                setSelectedPage("overview");
              }}
              className="popup-btn"
            >
              Discard this draft.
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openResubmitModal}
        onRequestClose={() => setOpenResubmitModal(false)}
        contentLabel="Resubmit Modal"
        style={customStyles}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem 2rem 0 2rem",
          }}
        >
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          >
            Would you like to resubmit your application?
          </h3>
          <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
            We can see you have made some changes to your submitted
            applications, but haven't resubmitted the form. If you continue back
            to the 'Overview' of your application without resubmitting, all of
            your changes will be descarded. Would you like to countinue filling
            out the form or go back to the overview?
          </p>
          <div className="popup-btns">
            <button
              style={{ backgroundColor: "#c0002a", color: "white" }}
              onClick={() => setOpenResubmitModal(false)}
              className="popup-btn"
            >
              Yes, continue form fillout.
            </button>
            <button
              style={{
                backgroundColor: "EFEFE9",
                color: "#c0002a",
                outlineColor: "#c0002a",
                outlineStyle: "#c0002a",
                outlineWidth: 2,
              }}
              onClick={() => {
                setOpenResubmitModal(false);
                setSelectedPage("overview");
              }}
              className="popup-btn"
            >
              Back to 'Overview'
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openSubmitModal}
        onRequestClose={() => setOpenSubmitModal(false)}
        contentLabel="Submit Modal"
        style={customStyles}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem 2rem 0 2rem",
          }}
        >
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          >
            Would you like to continue working on your application?
          </h3>
          <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
            We can see you have made some changes to your saved applications,
            but haven't submitted the form. If you continue back to the
            'Overview' of your application without aving or submitting, all of
            your changes will be descarded. Would you like to save current
            changes or go back to the overview?
          </p>
          <div className="popup-btns">
            <button
              style={{ backgroundColor: "#c0002a", color: "white" }}
              onClick={() => saveProgress(formik.values)}
              className="popup-btn"
            >
              Yes, save current changes.
            </button>
            <button
              style={{
                backgroundColor: "EFEFE9",
                color: "#c0002a",
                outlineColor: "#c0002a",
                outlineStyle: "#c0002a",
                outlineWidth: 2,
              }}
              onClick={() => setOpenSubmitModal(false)}
              className="popup-btn"
            >
              Countinue form fillout.
            </button>
            <button
              style={{
                backgroundColor: "EFEFE9",
                color: "#c0002a",
                outlineColor: "#c0002a",
                outlineStyle: "#c0002a",
                outlineWidth: 2,
              }}
              onClick={() => {
                setOpenSubmitModal(false);
                setSelectedPage("overview");
              }}
              className="popup-btn"
            >
              Discard this draft.
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
