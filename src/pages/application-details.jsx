import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar"; // Import your Navbar component
import Footer from "../components/Footer"; // Import your Navbar component
import "../css/application-details.css";
import "../css/layout.css"; // Import your custom styles
import DeleteButton from "../components/DeleteButton";
import ApplicationForm from "../components/ApplicationForm1";
import Modal from "react-modal";
import ActivityTable from "../components/ActivityTable";
import ApplicationForm3 from "../components/ApplicationForm3";
import { getUserData } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ApplicationForm1 from "../components/ApplicationForm1";
import ApplicationForm4 from "../components/ApplicationForm4";

export default function ApplicationDetails({
  grantId,
  deadline,
  applicationId,
  setApplicationId,
}) {
  const [grantName, setGrantname] = useState("");
  const [journalnr, setJournalNr] = useState("");
  const [user, setUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState("overview");
  const [today, setToday] = useState(new Date());
  const [submitted, setSubmitted] = useState(true);
  const [applicationForm, setApplicationForm] = useState(null);
  const [application, setApplication] = useState(null);
  const userFromRedux = useSelector((state) => state.auth.user);

  const fetchApplicationForm = () => {
    fetch(
      `http://localhost:3005/application-form/applicationId/${applicationId}`
    )
      .then((response) => response.json())
      .then((applicationData) => {
        setApplicationForm(applicationData);
        console.log(applicationData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchApplication = () => {
    fetch(`http://localhost:3005/application/${applicationId}`)
      .then((response) => response.json())
      .then((applicationData) => {
        setApplication(applicationData);
        console.log(applicationData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setUser(userFromRedux);
  }, [userFromRedux]);

  /*  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    if (applicationId) {
      fetchApplicationForm();
      fetchApplication();
    }
    fetchUserData();
  }, []); */

  useEffect(() => {
    if (user) {
      getJournalnr();
    }
  }, [user]);

  useEffect(() => {
    getGrantname();
  }, []);

  const submitForm = (values) => {
    console.log(values);
    let applicationData;

    if (grantId === 1) {
      applicationData = {
        project_title: values.projectTitle,
        experience_description: values.experienceDescription,
        benefit_description: values.benefitDescription,
        future_vision_description: values.futureVisionDescription,
        agreement_info: values.agreementInfo,
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
      };
    }

    if (grantId === 3) {
      applicationData = {
        recedency_name: values.recedency_name,
        project_description: values.projectDescription,
        project_country: values.destinationCountry,
        recedency_start_date: values.recedencyStartDate,
        recedency_end_date: values.recedencyEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
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

    fetch(`http://localhost:3005/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then(() =>
        fetch(`http://localhost:3005/address/${user.address.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        })
      )
      .then((response) => response.json())
      .then(() =>
        fetch(
          `http://localhost:3005/application-form/call-stored-procedure/${user.id}/${grantId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(applicationData),
          }
        )
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApplicationId(data);
        setSelectedPage("overview");
        setSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        // Handle errors
      });
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
      };
    }

    if (grantId === 3) {
      applicationData = {
        recedency_name: values.recedency_name,
        project_description: values.projectDescription,
        project_country: values.destinationCountry,
        recedency_start_date: values.recedencyStartDate,
        recedency_end_date: values.recedencyEndDate,
        requested_amount: values.requestedAmount,
        overall_amount: values.overallAmount,
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
      };
    }

    fetch(`http://localhost:3005/application-form/${applicationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedPage("overview");
        setSubmitted(true);
        fetchApplicationForm();
      })
      .catch((err) => {
        console.error(err);
        // Handle errors
      });
  };

  const getGrantname = () => {
    if (grantId === 1)
      setGrantname(
        "International Climate Sustainable Collaborations for music and performing arts"
      );
    if (grantId === 2) setGrantname("Curatorial Research Trips");
    if (grantId === 3) setGrantname("Stays At Foreign Residencies");
    if (grantId === 4)
      setGrantname("Literature Meetings for Children and Teens");
  };
  const getJournalnr = () => {
    console.log(user);
    if (user && user.journalnr) {
      setJournalNr(user.journalnr);
    } else {
      const initials = user
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
      <Navbar />
      {user && <div>hello world</div>}
      <div className="content-container">
        <div className="row">
          <p>Create application</p>
          <p>{">"}</p>
          <p>{grantName && grantName}</p>
        </div>
        <div className="title">
          <div>
            <h1 style={{ fontWeight: "500", maxWidth: "75rem" }}>
              {grantName && grantName}
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
          <DeleteButton />
        </div>
        <div className="overview-sec">
          <div className="tab-cards">
            <span
              onClick={() => setSelectedPage("overview")}
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
              onClick={() => setSelectedPage("form")}
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
                  Application not submitted
                </span>
              </p>
            </div>
            <div>
              <p>
                <span style={{ fontWeight: "600" }}>Grant name :</span>
                <span style={{ marginLeft: "2rem" }}>
                  {grantName && grantName}
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
          {selectedPage === "form" && grantId === 1 && (
            <ApplicationForm1
              grant={grantName}
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationId}
              userDetails={user}
            />
          )}
          {selectedPage === "form" && grantId === 2 && (
            <ApplicationForm2
              grant={grantName}
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationId}
              userDetails={user}
            />
          )}
          {selectedPage === "form" && grantId === 3 && (
            <ApplicationForm3
              grant={grantName}
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationId}
              userDetails={user}
            />
          )}
          {selectedPage === "form" && grantId === 4 && (
            <ApplicationForm4
              grant={grantName}
              onSubmitForm={submitForm}
              onResubmitForm={resubmitForm}
              applicationDetails={applicationForm}
              applicationId={applicationId}
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
            Application successfully submitted!
          </h3>
          <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
            The application for {grantName && grantName} has been submitted. It
            may take us a few days to review your application. If you have any
            questions about the process or your application contact the SLSK
            Portal.
          </p>
          <button
            style={{ width: "10rem" }}
            onClick={() => setSubmitted(false)}
          >
            Close X
          </button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
