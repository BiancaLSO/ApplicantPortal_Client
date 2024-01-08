import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/NavBar"; // Import your Navbar component
import Footer from "../components/Footer"; // Import your Navbar component
import "../css/application-details.css";
import "../css/layout.css"; // Import your custom styles
import DeleteButton from "../components/DeleteButton";
import ApplicationForm from "../components/ApplicationForm1";
import Modal from "react-modal";
import ActivityTable from "../components/ActivityTable";
import ApplicationForm3 from "../components/ApplicationForm3";
import { editUser, getUserData } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ApplicationForm1 from "../components/ApplicationForm1";
import ApplicationForm4 from "../components/ApplicationForm4";
import ApplicationForm2 from "../components/ApplicationForm2";
import {
  getApplication,
  getApplicationForm,
  isApplicationSubmitted,
  resetApplicationId,
  resetIdState,
  resubmitApplication,
  saveApplication,
  setApplicationId,
  setPopUpMsg,
  updateApplication,
} from "../redux/application/applicationSlice";
import { useLocation } from "react-router-dom";
import { getGrantById, resetGrantState } from "../redux/grant/grantSlice";

export default function ApplicationDetails({ deadline }) {
  const location = useLocation();
  const { grantId, applicationId, defaultPage } = location.state || {};
  const dispatch = useDispatch();
  const [journalnr, setJournalNr] = useState("");
  const [selectedPage, setSelectedPage] = useState(defaultPage);
  const [today, setToday] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openResubmitModal, setOpenResubmitModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const application = useSelector((state) => state.application.application);
  const grant = useSelector((state) => state.grants.grant);
  const applicationForm = useSelector(
    (state) => state.application.applicationForm
  );
  const hasBeenSubmitted = useSelector(
    (state) => state.application.hasBeenSubmitted
  );
  const popUpMsg = useSelector((state) => state.application.error);
  const token = useSelector((state) => state.auth.token);
  const applicationIdRedux = useSelector(
    (state) => state.application.applicationId
  );

  useEffect(() => {
    if (applicationId && !grantId) {
      dispatch(setApplicationId({ applicationId, token }));
    }
  }, [dispatch, applicationId]);

  useEffect(() => {
    console.log("effin id", applicationIdRedux);
    console.log("the deets", applicationForm);
  }, [dispatch, applicationIdRedux, applicationForm]);

  /*  useEffect(() => {
    console.log("the redux id", applicationIdRedux);
    if (applicationIdRedux !== null) {
      console.log("not here", applicationIdRedux);
      dispatch(
        getApplication({
          applicationId: applicationIdRedux,
          token: token,
        })
      );
      dispatch(
        getApplicationForm({
          applicationId: applicationIdRedux,
          token: token,
        })
      );
      dispatch(
        isApplicationSubmitted({
          applicationId: applicationIdRedux,
          token: token,
        })
      );
    }
  }, [dispatch, applicationIdRedux]); */

  useEffect(() => {
    if (applicationId && application) {
      dispatch(getGrantById({ grantId: application.grant.id, token: token }));
    }
  }, [dispatch, application, applicationId, token]);

  useEffect(() => {
    if (user) {
      getJournalnr();
    }
  }, [user]);

  /* useEffect(() => {
    if (grantId && !applicationId) {
      console.log("not here");
      dispatch(resetGrantState(undefined));
      dispatch(resetIdState(undefined));
    }
  }, [grantId, applicationId]);

  useEffect(() => {
    if (
      grantId &&
      !grant &&
      !applicationForm &&
      !applicationIdRedux &&
      !application
    )
      dispatch(getGrantById({ grantId: grantId, token: token }));
  }, [application, grant, applicationForm, applicationIdRedux, grantId]); */

  useEffect(() => {
    if (grantId && !applicationId) {
      dispatch(resetGrantState(undefined));
      dispatch(resetIdState(undefined));
      dispatch(getGrantById({ grantId: grantId, token: token }));
    }
  }, [dispatch, grantId, applicationId, token]);

  const submitForm = (body) => {
    console.log(body);
    let applicationData;

    if (grantId === 1) {
      applicationData = {
        project_title: body.values?.projectTitle,
        experience_description: body.values?.experienceDescription,
        benefit_description: body.values?.benefitDescription,
        future_vision_description: body.values?.futureVisionDescription,
        agreement_info: body.values?.agreementInfo,
        form_step: body.values?.formStep,
      };
    }

    if (grantId === 2) {
      applicationData = {
        traveler_name_and_position: body.values?.travelerNameAndPosition,
        purpose_description: body.values?.purposeDescription,
        departure_country: body.values?.departureCountry,
        departure_city: body.values?.departureCity,
        destination_country: body.values?.destinationCountry,
        destination_city: body.values?.destinationCity,
        trip_start_date: body.values?.tripStartDate,
        trip_end_date: body.values?.tripEndDate,
        requested_amount: body.values?.requestedAmount,
        overall_amount: body.values?.overallAmount,
        form_step: body.values?.formStep,
      };
    }

    if (grantId === 3) {
      applicationData = {
        recedency_name: body.values?.recedencyName,
        project_description: body.values?.projectDescription,
        project_country: body.values?.projectCountry,
        recedency_start_date: body.values?.recedencyStartDate,
        recedency_end_date: body.values?.recedencyEndDate,
        requested_amount: body.values?.requestedAmount,
        overall_amount: body.values?.overallAmount,
        form_step: body.values?.formStep,
      };
    }

    if (grantId === 4) {
      applicationData = {
        author_full: body.values?.authorFullName,
        event_location: body.values?.eventLocation,
        target_group: body.values?.targetGroup,
        purpose_description: body.values?.purposeDescription,
        is_catalog_used: body.values?.isCatalogUsed,
        requested_amount: body.values?.requestedAmount,
        overall_amount: body.values?.overallAmount,
        event_date: body.values?.eventDate,
        municipality: body.values?.municipality,
        form_step: body.values?.formStep,
      };
    }

    const userData = {
      firstName: body.values?.firstName,
      lastName: body.values?.lastName,
      phone: body.values?.phone,
      cpr: body.values?.cpr,
      email: body.values?.email,
    };

    const addressData = {
      street: body.values?.street,
      city: body.values?.city,
      zipCode: body.values?.zipCode,
    };

    dispatch(
      editUser({
        userId: user.id,
        userBody: userData,
        addressBody: addressData,
        token: token,
      })
    );

    console.log("this is the probelm", token);
    fetch(
      `http://localhost:3005/application-form/call-stored-procedure/${user.id}/${grantId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include additional headers if needed
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          values: applicationData,
          submission: body.submission,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        console.log("Success:", data);
        dispatch(
          getApplication({
            applicationId: data,
            token: token,
          })
        );
        dispatch(
          setApplicationId({
            applicationId: data,
            token: token,
          })
        );
        dispatch(
          getApplicationForm({
            applicationId: data,
            token: token,
          })
        );
        dispatch(
          isApplicationSubmitted({
            applicationId: data,
            token: token,
          })
        );
        console.log("thhe body", body.submission);
        dispatch(
          setPopUpMsg(
            body.submission === false
              ? "Application successfully created!"
              : "Application successfully submitted!"
          )
        );
      })
      .catch((error) => {
        // Handle errors during the fetch
        console.error("Error:", error);
      });
    setSelectedPage("overview");
    setSubmitted(true);
  };

  const resubmitForm = (values) => {
    console.log("the resubmit");
    let applicationData;

    if (grantId === 1) {
      applicationData = {
        project_title: values.projectTitle,
        experience_description: values.experienceDescription,
        benefit_description: values.benefitDescription,
        future_vision_description: values.futureVisionDescription,
        agreement_info: values.agreementInfo,
        form_step: values?.formStep,
      };
    }

    if (grantId === 2) {
      applicationData = {
        traveler_name_and_position: values.travelerNameAndPosition,
        purpose_description: values.purposeDescription,
        departure_country: values.departureCountry,
        departure_city: values.departureCity,
        destination_country: values.destinationCountry,
        destination_city: values.destinationCity,
        trip_start_date: values.tripStartDate,
        trip_end_date: values.tripEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        form_step: values?.formStep,
      };
    }

    if (grantId === 3) {
      applicationData = {
        recedency_name: values.recedencyName,
        project_description: values.projectDescription,
        project_country: values.projectCountry,
        recedency_start_date: values.recedencyStartDate,
        recedency_end_date: values.recedencyEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        form_step: values?.formStep,
      };
    }

    if (grantId === 4) {
      applicationData = {
        author_full: values.authorFullName,
        event_location: values.eventLocation,
        target_group: values.targetGroup,
        purpose_description: values.purposeDescription,
        is_catalog_used: values.isCatalogUsed,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        event_date: values.eventDate,
        municipality: values.municipality,
        form_step: values?.formStep,
      };
    }

    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      cpr: values.cpr,
      email: values.email,
    };

    const addressData = {
      street: values.street,
      city: values.city,
      zipCode: values.zipCode,
    };

    dispatch(
      editUser({
        userId: user.id,
        userBody: userData,
        addressBody: addressData,
        token: token,
      })
    );
    dispatch(
      resubmitApplication({
        applicationId: applicationIdRedux,
        application: applicationData,
        token: token,
      })
    );

    console.log("Action dispatched");

    dispatch(
      getApplication({
        applicationId: applicationIdRedux,
        token: token,
      })
    );
    setSelectedPage("overview");
    setSubmitted(true);
  };

  const onUpdateForm = (values) => {
    let applicationData;

    if (grantId === 1) {
      applicationData = {
        project_title: values.projectTitle,
        experience_description: values.experienceDescription,
        benefit_description: values.benefitDescription,
        future_vision_description: values.futureVisionDescription,
        agreement_info: values.agreementInfo,
        form_step: values?.formStep,
      };
    }

    if (grantId === 2) {
      applicationData = {
        traveler_name_and_position: values.travelerNameAndPosition,
        purpose_description: values.purposeDescription,
        departure_country: values.departureCountry,
        departure_city: values.departureCity,
        destination_country: values.destinationCountry,
        destination_city: values.destinationCity,
        trip_start_date: values.tripStartDate,
        trip_end_date: values.tripEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        form_step: values?.formStep,
      };
    }

    if (grantId === 3) {
      applicationData = {
        recedency_name: values.recedencyName,
        project_description: values.projectDescription,
        project_country: values.projectCountry,
        recedency_start_date: values.recedencyStartDate,
        recedency_end_date: values.recedencyEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        form_step: values?.formStep,
      };
    }

    if (grantId === 4) {
      applicationData = {
        author_full: values.authorFullName,
        event_location: values.eventLocation,
        target_group: values.targetGroup,
        purpose_description: values.purposeDescription,
        is_catalog_used: values.isCatalogUsed,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        event_date: values.eventDate,
        municipality: values.municipality,
        form_step: values?.formStep,
      };
    }

    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      cpr: values.cpr,
      email: values.email,
    };

    const addressData = {
      street: values.street,
      city: values.city,
      zipCode: values.zipCode,
    };

    dispatch(
      editUser({
        userId: user.id,
        userBody: userData,
        addressBody: addressData,
        token: token,
      })
    );
    dispatch(
      updateApplication({
        applicationId: applicationIdRedux,
        application: applicationData,
        token: token,
      })
    );

    console.log("Action dispatched again");

    dispatch(
      getApplication({
        applicationId: applicationIdRedux,
        token: token,
      })
    );
    setSelectedPage("overview");
    setSubmitted(true);
  };

  const onSaveApplication = (values) => {
    console.log("the resubmit");
    let applicationData;

    if (grantId === 1) {
      applicationData = {
        project_title: values.projectTitle,
        experience_description: values.experienceDescription,
        benefit_description: values.benefitDescription,
        future_vision_description: values.futureVisionDescription,
        agreement_info: values.agreementInfo,
        form_step: values?.formStep,
      };
    }

    if (grantId === 2) {
      applicationData = {
        traveler_name_and_position: values.travelerNameAndPosition,
        purpose_description: values.purposeDescription,
        departure_country: values.departureCountry,
        departure_city: values.departureCity,
        destination_country: values.destinationCountry,
        destination_city: values.destinationCity,
        trip_start_date: values.tripStartDate,
        trip_end_date: values.tripEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        form_step: values?.formStep,
      };
    }

    if (grantId === 3) {
      console.log(values.projectDescription);
      applicationData = {
        recedency_name: values.recedencyName,
        project_description: values.projectDescription,
        project_country: values.projectCountry,
        recedency_start_date: values.recedencyStartDate,
        recedency_end_date: values.recedencyEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        form_step: values?.formStep,
      };
    }

    if (grantId === 4) {
      applicationData = {
        author_full: values.authorFullName,
        event_location: values.eventLocation,
        target_group: values.targetGroup,
        purpose_description: values.purposeDescription,
        is_catalog_used: values.isCatalogUsed,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
        event_date: values.eventDate,
        municipality: values.municipality,
        form_step: values?.formStep,
      };
    }

    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      cpr: values.cpr,
      email: values.email,
    };

    const addressData = {
      street: values.street,
      city: values.city,
      zipCode: values.zipCode,
    };

    dispatch(
      editUser({
        userId: user.id,
        userBody: userData,
        addressBody: addressData,
        token: token,
      })
    );
    dispatch(
      saveApplication({
        applicationId: applicationIdRedux,
        application: applicationData,
        token: token,
      })
    );

    console.log("Action dispatched");

    dispatch(
      getApplication({
        applicationId: applicationIdRedux,
        token: token,
      })
    );
    setSelectedPage("overview");
    setSubmitted(true);
  };

  const getJournalnr = () => {
    console.log(user);
    if (user && user.journalnr) {
      setJournalNr(user.journalnr);
    } else {
      const initials =
        user !== null
          ? user.firstName.charAt(0) + user.lastName.charAt(0)
          : "AB";
      const numberSer = generateRandomSequence(8);

      setJournalNr(initials + numberSer);
    }
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  const generateRandomSequence = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += generateRandomNumber();
    }
    return result;
  };

  const customStyles = {
    content: {
      width: "50%", // Set your desired width
      height: "25rem", // Set your desired height
      margin: "auto", // Center the modal
      zIndex: 50,
      borderRadius: "10px",
    },
  };

  return (
    <div className="app-container">
      <Navbar
        setOpenResubmitModal={setOpenResubmitModal}
        setOpenSaveModal={setOpenSaveModal}
        setOpenSubmitModal={setOpenSubmitModal}
        hasFormChanged={hasFormChanged}
        selectedPage={selectedPage}
      />
      <div className="content-container">
        <div className="row">
          <p>Create application</p>
          <p>{">"}</p>
          <p>{grant && grant.title}</p>
        </div>
        <div className="title">
          <div>
            <h1 style={{ fontWeight: "500", maxWidth: "75rem" }}>
              {grant && grant.title}
            </h1>
            <div className="subtitle">
              <p>
                Created at: <span> {today.toLocaleString()}</span>
              </p>
              <p>
                Application deadline: <span> {deadline.toLocaleString()}</span>
              </p>
            </div>
          </div>
          {application && application.isActive === true ? <DeleteButton /> : ""}
        </div>
        <div className="overview-sec">
          <div className="tab-cards">
            <span
              onClick={() => {
                if (applicationIdRedux && hasBeenSubmitted) {
                  if (hasFormChanged) {
                    setOpenResubmitModal(true);
                  } else setSelectedPage("overview");
                } else if (applicationId === undefined) {
                  setOpenSaveModal(true);
                } else if (!hasBeenSubmitted && hasFormChanged) {
                  if (
                    application?.activities &&
                    application?.activities.length > 0
                  ) {
                    setOpenSubmitModal(true);
                  } else {
                    setOpenSaveModal(true);
                  }
                } else {
                  setSelectedPage("overview");
                }
              }}
              className={`tab-card ${
                selectedPage === "overview" ? "special-class" : ""
              }`}
              style={{
                zIndex: selectedPage === "overview" && !submitted ? "2" : "",
              }}
            >
              <p>APPLICATION OVERVIEW</p>
            </span>
            <span
              onClick={() => {
                setOpenSaveModal(false);
                setOpenResubmitModal(false);
                setOpenSubmitModal(false);
                setSelectedPage("form");
              }}
              className={`tab-card ${
                selectedPage === "form" ? "special-class" : ""
              }`}
              style={{ marginLeft: "-1rem" }}
            >
              <p>APPLICATION FORM</p>
            </span>
          </div>
          <div className="overview">
            <div>
              <p>
                <span style={{ fontWeight: "600" }}>Journal number :</span>
                <span style={{ marginLeft: "2rem" }}>
                  {journalnr && journalnr}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Application status :</span>
                <span style={{ marginLeft: "2rem" }}>
                  {application
                    ? application.activities[
                        application.activities.length > 1
                          ? application.activities.length - 1
                          : 1
                      ].status.name
                    : "Application not submitted"}
                </span>
              </p>
            </div>
            <div>
              <p>
                <span style={{ fontWeight: "600" }}>Grant name :</span>
                <span style={{ marginLeft: "2rem" }}>
                  {grant && grant.title}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Role :</span>{" "}
                <span style={{ marginLeft: "2rem" }}>Applicant</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          {selectedPage === "form" && grant && grant.id === 1 && (
            <ApplicationForm1
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationIdRedux}
              hasBeenSubmitted={hasBeenSubmitted}
              openResubmitModal={openResubmitModal}
              openSaveModal={openSaveModal}
              setOpenSaveModal={setOpenSaveModal}
              setOpenResubmitModal={setOpenResubmitModal}
              setSelectedPage={setSelectedPage}
              setHasFormChanged={setHasFormChanged}
              onUpdateForm={onUpdateForm}
              openSubmitModal={openSubmitModal}
              setOpenSubmitModal={setOpenSubmitModal}
              onSaveApplication={onSaveApplication}
              userDetails={user}
            />
          )}
          {selectedPage === "form" && grant && grant.id === 2 && (
            <ApplicationForm2
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationIdRedux}
              hasBeenSubmitted={hasBeenSubmitted}
              openResubmitModal={openResubmitModal}
              openSaveModal={openSaveModal}
              setOpenSaveModal={setOpenSaveModal}
              setOpenResubmitModal={setOpenResubmitModal}
              setSelectedPage={setSelectedPage}
              setHasFormChanged={setHasFormChanged}
              onUpdateForm={onUpdateForm}
              openSubmitModal={openSubmitModal}
              setOpenSubmitModal={setOpenSubmitModal}
              onSaveApplication={onSaveApplication}
              userDetails={user}
            />
          )}
          {selectedPage === "form" && grant && grant.id === 3 && (
            <ApplicationForm3
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationIdRedux}
              hasBeenSubmitted={hasBeenSubmitted}
              openResubmitModal={openResubmitModal}
              openSaveModal={openSaveModal}
              setOpenSaveModal={setOpenSaveModal}
              setOpenResubmitModal={setOpenResubmitModal}
              setSelectedPage={setSelectedPage}
              setHasFormChanged={setHasFormChanged}
              onUpdateForm={onUpdateForm}
              openSubmitModal={openSubmitModal}
              setOpenSubmitModal={setOpenSubmitModal}
              onSaveApplication={onSaveApplication}
              userDetails={user}
            />
          )}
          {selectedPage === "form" && grant && grant.id === 4 && (
            <ApplicationForm4
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationIdRedux}
              hasBeenSubmitted={hasBeenSubmitted}
              openResubmitModal={openResubmitModal}
              openSaveModal={openSaveModal}
              setOpenSaveModal={setOpenSaveModal}
              setOpenResubmitModal={setOpenResubmitModal}
              setSelectedPage={setSelectedPage}
              setHasFormChanged={setHasFormChanged}
              onUpdateForm={onUpdateForm}
              openSubmitModal={openSubmitModal}
              setOpenSubmitModal={setOpenSubmitModal}
              onSaveApplication={onSaveApplication}
              userDetails={user}
            />
          )}
          {selectedPage === "overview" && (
            <div>
              <div className="form-div">
                <h2 className="sec-title" style={{ fontWeight: "500" }}>
                  Application activities
                </h2>
                <p className="sec-subtitle">
                  Here you might be asked to do something additionally.
                </p>
                <div
                  style={{
                    backgroundColor: "#EFEFE9",
                    borderRadius: 10,
                    height: "15rem",
                    marginTop: "3rem",
                  }}
                >
                  <p
                    style={{
                      width: "60rem",
                      fontSize: "1.4rem",
                      padding: "4rem 0 0 4rem",
                    }}
                  >
                    There’s no additional activities for you as of yet. If you
                    have any further questions about the approval process or
                    inquires about your application, please contact us.
                  </p>
                </div>
              </div>
              {application && application.activities.length > 0 && (
                <ActivityTable data={application.activities} />
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={submitted}
        onRequestClose={() => setSubmitted(false)}
        contentLabel="Example Modal"
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
            {popUpMsg}
          </h3>
          {popUpMsg === "Application successfully submitted!" && (
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              The application for {grant && grant && grant?.title} has been
              submitted. It may take us a few days to review your application.
              If you have any questions about the process or your application
              contact the SLSK Portal.
            </p>
          )}
          {popUpMsg === "Application successfully resubmitted!" && (
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              The application for {grant && grant && grant?.title} has been
              resubmitted. The application processing time will be prolonged due
              to the resubmission. The processing may take up to 14days, but if
              you have any further questions, please contact the SLKS portal.
            </p>
          )}
          {popUpMsg === "Your progress has been saved!" && (
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              The changes in the form for the {grant && grant && grant?.title}{" "}
              application have been saved. The application needs to be submitted
              by {deadline}.
            </p>
          )}
          {popUpMsg === "The application has now been archived." && (
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              The application for {grant && grant && grant?.title} has been made
              inactive and is now archived in our database. The application will
              be deleted and all of the information will be removed
              automatically in 6 months.
            </p>
          )}
          {popUpMsg === "Application successfully created!" && (
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              The application for {grant && grant && grant?.title} has now been
              created. The application needs to be filled out and submitted by{" "}
              {deadline}.
            </p>
          )}
          <button
            style={{ backgroundColor: "#C0002A", color: "white" }}
            className="popup-btn"
            onClick={() => setSubmitted(false)}
          >
            X Close
          </button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
