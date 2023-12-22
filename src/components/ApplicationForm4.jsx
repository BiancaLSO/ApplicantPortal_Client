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
  RadioGroup,
  Radio,
} from "@mui/material";

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

export default function ApplicationForm4({
  grant,
  onSubmitForm,
  onResubmitForm,
  applicationDetails,
  applicationId,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserDetails(JSON.parse(storedUser));
      }
    };
    fetchUserData();
    console.log(applicationDetails);
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

      authorFullName: "",
      eventLocation: "",
      targetGroup: "",
      purposeDescription: "",
      isCatalogUsed: "",
      requestedAmount: "",
      overallAmount: "",
      eventDate: "",
      municipality: "",
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

      authorFullName: Yup.string()
        .required("Required")
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be at most 100 characters"),

      eventLocation: Yup.string()
        .required("Required")
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be at most 100 characters"),

      targetGroup: Yup.string()
        .required("Required")
        .min(100, "Must be at least 10 characters")
        .max(1000, "Must be at most 100 characters"),

      purposeDescription: Yup.string()
        .required("Required")
        .min(100, "Must be at least 100 characters")
        .max(1000, "Must be at most 1000 characters"),

      isCatalogUsed: Yup.boolean().required("Please select one of the options"),

      eventDate: Yup.date()
        .required("Required")
        .min(
          new Date("2023-01-01"),
          "Date must be after or on January 01, 2023"
        )
        .max(
          new Date("2023-12-31"),
          "Date must be before or on December 31, 2023"
        ),

      requestedAmount: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0")
        .integer("Must be a whole number"),

      overallAmount: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0")
        .integer("Must be a whole number"),

      municipality: Yup.string()
        .required("Required")
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be at most 100 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (applicationId) {
        onResubmitForm(values);
      } else {
        onSubmitForm(values);
      }
      resetForm();
      setCurrentStep(1);
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

    if (applicationDetails) {
      if (applicationDetails.author_full)
        formik.initialValues.authorFullName = applicationDetails.author_full;
      if (applicationDetails.purpose_description)
        formik.initialValues.purposeDescription =
          applicationDetails.purpose_description;
      if (applicationDetails.event_location)
        formik.initialValues.eventLocation = applicationDetails.event_location;
      if (applicationDetails.target_group)
        formik.initialValues.targetGroup = applicationDetails.target_group;
      if (applicationDetails.is_catalog_used)
        formik.initialValues.isCatalogUsed = applicationDetails.is_catalog_used;
      if (applicationDetails.event_date)
        formik.initialValues.eventDate = applicationDetails.event_date;
      if (applicationDetails.requested_amount)
        formik.initialValues.requestedAmount =
          applicationDetails.requested_amount;
      if (applicationDetails.overall_amount)
        formik.initialValues.overallAmount = applicationDetails.overall_amount;
      if (applicationDetails.municipality)
        formik.initialValues.municipality = applicationDetails.municipality;
    }
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isFormChanged =
    formik.values.authorFullName !== applicationDetails?.author_full ||
    formik.values.eventLocation !== applicationDetails?.event_location ||
    formik.values.targetGroup !== applicationDetails?.target_group ||
    formik.values.purposeDescription !==
      applicationDetails?.purpose_description ||
    formik.values.isCatalogUsed !== applicationDetails?.is_catalog_used ||
    formik.values.requestedAmount !== applicationDetails?.requested_amount ||
    formik.values.overallAmount !== applicationDetails?.overall_amount ||
    formik.values.eventDate !== applicationDetails?.event_date ||
    formik.values.municipality !== applicationDetails?.municipality;

  return (
    <div className="form-div">
      <h2 className="sec-title" style={{ fontWeight: "500" }}>
        Application form
      </h2>
      <p className="sec-subtitle">{grant && grant}</p>
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
                  id="authorFullName"
                  name="authorFullName"
                  label="Author's full name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.authorFullName}
                  error={
                    formik.touched.authorFullName &&
                    Boolean(formik.errors.authorFullName)
                  }
                  helperText={
                    formik.touched.authorFullName &&
                    formik.errors.authorFullName
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="targetGroup"
                  name="targetGroup"
                  label="Target audience & event description"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.targetGroup}
                  error={
                    formik.touched.targetGroup &&
                    Boolean(formik.errors.targetGroup)
                  }
                  helperText={
                    formik.touched.targetGroup && formik.errors.targetGroup
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="purposeDescription"
                  name="purposeDescription"
                  label="Purpose description"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purposeDescription}
                  error={
                    formik.touched.purposeDescription &&
                    Boolean(formik.errors.purposeDescription)
                  }
                  helperText={
                    formik.touched.purposeDescription &&
                    formik.errors.purposeDescription
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "1rem",
                    width: "35rem",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ width: "70%" }} htmlFor="isCatalogUsed">
                    Have you made use of the Statens Kunstfonds' author catalog
                    (kunst.dk/forfatter) when working on your application?
                  </label>
                  <RadioGroup
                    id="isCatalogUsed"
                    name="isCatalogUsed"
                    value={formik.values.isCatalogUsed}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio style={{ color: "#c0002a" }} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio style={{ color: "#c0002a" }} />}
                      label="No"
                    />
                  </RadioGroup>
                </div>

                {formik.errors.isCatalogUsed && (
                  <div style={{ color: "red" }}>
                    {formik.errors.isCatalogUsed}
                  </div>
                )}
              </div>

              <div className="justify">
                <CssTextField
                  id="eventLocation"
                  name="eventLocation"
                  label="Event location"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventLocation}
                  error={
                    formik.touched.eventLocation &&
                    Boolean(formik.errors.eventLocation)
                  }
                  helperText={
                    formik.touched.eventLocation && formik.errors.eventLocation
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />
                <CssTextField
                  id="requestedAmount"
                  name="requestedAmount"
                  label="Requested amount"
                  type="number" // Add this line
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
                    step: 1, // Add this line to enforce whole numbers
                  }}
                />

                <CssTextField
                  id="overallAmount"
                  name="overallAmount"
                  label="Overall amount"
                  type="number" // Add this line
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
                    step: 1, // Add this line to enforce whole numbers
                  }}
                />

                <CssTextField
                  id="eventDate"
                  name="eventDate"
                  label="Event date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventDate}
                  error={
                    formik.touched.eventDate && Boolean(formik.errors.eventDate)
                  }
                  helperText={
                    formik.touched.eventDate && formik.errors.eventDate
                  }
                  inputProps={{
                    min: new Date("2023-01-01").toISOString().split("T")[0], // Set the minimum date
                    max: "2023-12-31", // Set the maximum date
                  }}
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="municipality"
                  name="municipality"
                  label="Municipality "
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.municipality}
                  error={
                    formik.touched.municipality &&
                    Boolean(formik.errors.municipality)
                  }
                  helperText={
                    formik.touched.municipality && formik.errors.municipality
                  }
                  style={{ margin: "1rem", width: "35rem" }}
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
                  <p style={{ fontWeight: "600" }}>
                    Author's/ Illustrator's full name:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.authorFullName}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    Description of the target audience & the event:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.targetGroup}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    Description of the project's purpose:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.purposeDescription}
                  </p>
                </div>

                <div>
                  <p style={{ fontWeight: "600" }}>
                    Have you made use of the Statens Kunstfonds' author catalog
                    (kunst.dk/forfatter) when working on your application?
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.isCatalogUsed === "true" ? "Yes" : "No"}
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
                <div>
                  <p style={{ fontWeight: "600" }}>Event date:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {new Date(formik.values.eventDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    The municipality you belong to:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.municipality}
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
                Boolean(formik.errors.authorFullName) ||
                Boolean(formik.errors.purposeDescription) ||
                Boolean(formik.errors.eventLocation) ||
                Boolean(formik.errors.targetGroup) ||
                Boolean(formik.errors.eventDate) ||
                Boolean(formik.errors.municipality) ||
                Boolean(formik.errors.requestedAmount) ||
                Boolean(formik.errors.overallAmount) ||
                !formik.values.authorFullName ||
                !formik.values.purposeDescription ||
                !formik.values.eventLocation ||
                !formik.values.targetGroup ||
                !formik.values.eventDate ||
                !formik.values.municipality ||
                formik.values.isCatalogUsed === "" ||
                formik.values.requestedAmount === "" ||
                formik.values.overallAmount === ""
              }
            >
              NEXT
            </button>
          )}

          {currentStep === 3 && applicationId && (
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
        </div>
      </form>
    </div>
  );
}
