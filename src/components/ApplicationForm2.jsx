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

export default function ApplicationForm2({
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

      travelerNameAndPosition: "",
      purposeDescription: "",
      departureCountry: "",
      departureCity: "",
      destinationCountry: "",
      destinationCity: "",
      tripStartDate: moment().format("YYYY-MM-DD"),
      tripEndDate: moment().format("YYYY-MM-DD"),
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

      travelerNameAndPosition: Yup.string()
        .required("Required")
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be at most 100 characters"),

      purposeDescription: Yup.string()
        .required("Required")
        .min(100, "Must be at least 100 characters")
        .max(1000, "Must be at most 1000 characters"),

      departureCountry: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters")
        .max(100, "Must be at most 100 characters")
        .test("isValidCountry", "Invalid country", isValidCountry),

      departureCity: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters")
        .max(100, "Must be at most 100 characters"),

      destinationCountry: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters")
        .max(100, "Must be at most 100 characters")
        .test("isValidCountry", "Invalid country", isValidCountry),

      destinationCity: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters")
        .max(100, "Must be at most 100 characters"),

      tripStartDate: Yup.date()
        .required("Required")
        .min(
          new Date("2024-01-01"),
          "Date must be after or on January 01, 2024"
        )
        .max(
          new Date("2024-12-31"),
          "Date must be before or on December 31, 2024"
        ),

      tripEndDate: Yup.date()
        .required("Required")
        .min(Yup.ref("tripStartDate"), "End date must be after start date")
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
        .min(0, "Must be greater than or equal to 0")
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
      if (applicationDetails.traveler_name_and_position)
        formik.initialValues.travelerNameAndPosition =
          applicationDetails.traveler_name_and_position;
      if (applicationDetails.purpose_description)
        formik.initialValues.purposeDescription =
          applicationDetails.purpose_description;
      if (applicationDetails.departure_country)
        formik.initialValues.departureCountry =
          applicationDetails.departure_country;
      if (applicationDetails.departure_city)
        formik.initialValues.departureCity = applicationDetails.departure_city;
      if (applicationDetails.destination_country)
        formik.initialValues.destinationCountry =
          applicationDetails.destination_country;
      if (applicationDetails.destination_city)
        formik.initialValues.destinationCity =
          applicationDetails.destination_city;
      if (applicationDetails.trip_start_date)
        formik.initialValues.tripStartDate = applicationDetails.trip_start_date;
      if (applicationDetails.trip_end_date)
        formik.initialValues.tripEndDate = applicationDetails.trip_end_date;
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
    formik.values.travelerNameAndPosition !==
      applicationDetails?.traveler_name_and_position ||
    formik.values.purposeDescription !==
      applicationDetails?.purpose_description ||
    formik.values.departureCountry !== applicationDetails?.departure_country ||
    formik.values.departureCity !== applicationDetails?.departure_city ||
    formik.values.destinationCountry !==
      applicationDetails?.destination_country ||
    formik.values.destinationCity !== applicationDetails?.destination_city ||
    formik.values.tripStartDate !== applicationDetails?.trip_start_date ||
    formik.values.tripEndDate !== applicationDetails?.trip_end_date ||
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
        values.travelerNameAndPosition.length > 0 ||
        values.purposeDescription.length > 0 ||
        values.departureCountry.length > 0 ||
        values.departureCity.length > 0 ||
        values.destinationCountry.length > 0 ||
        values.destinationCity.length > 0
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
        values.travelerNameAndPosition.length > 0 ||
        values.purposeDescription.length > 0 ||
        values.departureCountry.length > 0 ||
        values.departureCity.length > 0 ||
        values.destinationCountry.length > 0 ||
        values.destinationCity.length > 0
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
                  id="travelerNameAndPosition"
                  name="travelerNameAndPosition"
                  label="Traveler name & position"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.travelerNameAndPosition}
                  error={
                    formik.touched.travelerNameAndPosition &&
                    Boolean(formik.errors.travelerNameAndPosition)
                  }
                  helperText={
                    formik.touched.travelerNameAndPosition &&
                    formik.errors.travelerNameAndPosition
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="purposeDescription"
                  name="purposeDescription"
                  label="Purpose description"
                  multiline
                  rows={8}
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
                <CssTextField
                  id="departureCountry"
                  name="departureCountry"
                  label="Departure country"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.departureCountry}
                  error={
                    formik.touched.departureCountry &&
                    Boolean(formik.errors.departureCountry)
                  }
                  helperText={
                    formik.touched.departureCountry &&
                    formik.errors.departureCountry
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="departureCity"
                  name="departureCity"
                  label="Departure city"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.departureCity}
                  error={
                    formik.touched.departureCity &&
                    Boolean(formik.errors.departureCity)
                  }
                  helperText={
                    formik.touched.departureCity && formik.errors.departureCity
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />
              </div>

              <div className="justify">
                <CssTextField
                  id="destinationCountry"
                  name="destinationCountry"
                  label="Destination country"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.destinationCountry}
                  error={
                    formik.touched.destinationCountry &&
                    Boolean(formik.errors.destinationCountry)
                  }
                  helperText={
                    formik.touched.destinationCountry &&
                    formik.errors.destinationCountry
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="destinationCity"
                  name="destinationCity"
                  label="Destination city"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.destinationCity}
                  error={
                    formik.touched.destinationCity &&
                    Boolean(formik.errors.destinationCity)
                  }
                  helperText={
                    formik.touched.destinationCity &&
                    formik.errors.destinationCity
                  }
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="tripStartDate"
                  name="tripStartDate"
                  label="Trip start date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tripStartDate}
                  error={
                    formik.touched.tripStartDate &&
                    Boolean(formik.errors.tripStartDate)
                  }
                  helperText={
                    formik.touched.tripStartDate && formik.errors.tripStartDate
                  }
                  inputProps={{
                    min: new Date("2024-01-01").toISOString().split("T")[0],
                    max: "2024-12-31",
                  }}
                  style={{ margin: "1rem", width: "35rem" }}
                />

                <CssTextField
                  id="tripEndDate"
                  name="tripEndDate"
                  label="Trip end date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tripEndDate}
                  error={
                    formik.touched.tripEndDate &&
                    Boolean(formik.errors.tripEndDate)
                  }
                  helperText={
                    formik.touched.tripEndDate && formik.errors.tripEndDate
                  }
                  inputProps={{
                    min: formik.values.tripStartDate,
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
                  <p style={{ fontWeight: "600" }}>Traveler name & position:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.travelerNameAndPosition}
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
                    The country of your departure:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.departureCountry}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    The city of your departure:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.departureCity}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    The country of your destination:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.destinationCountry}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>
                    The city of your destination:
                  </p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {formik.values.destinationCity}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Trip start date:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {new Date(formik.values.tripStartDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Trip end date:</p>
                  <p
                    style={{
                      width: "50rem",
                      fontSize: "1.3rem",
                      marginTop: "-0.7rem",
                    }}
                  >
                    {new Date(formik.values.tripEndDate).toLocaleDateString(
                      "en-GB"
                    )}
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
                Boolean(formik.errors.travelerNameAndPosition) ||
                Boolean(formik.errors.purposeDescription) ||
                Boolean(formik.errors.departureCountry) ||
                Boolean(formik.errors.departureCity) ||
                Boolean(formik.errors.destinationCountry) ||
                Boolean(formik.errors.destinationCity) ||
                Boolean(formik.errors.tripStartDate) ||
                Boolean(formik.errors.tripEndDate) ||
                Boolean(formik.errors.requestedAmount) ||
                Boolean(formik.errors.overallAmount) ||
                !formik.values.travelerNameAndPosition ||
                !formik.values.purposeDescription ||
                !formik.values.departureCountry ||
                !formik.values.departureCity ||
                !formik.values.destinationCountry ||
                !formik.values.destinationCity ||
                !formik.values.tripStartDate ||
                !formik.values.tripEndDate ||
                formik.values.requestedAmount === "" ||
                !formik.values.overallAmount === ""
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
