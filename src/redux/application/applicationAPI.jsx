import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";

class ApplicationAPI {
  static async getApplication(applicationId, token) {
    console.log(applicationId, token);
    try {
      const result = await axios.get(
        `http://localhost:3005/application/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Fetching application failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async getApplicationForm(applicationId, token) {
    try {
      const result = await axios.get(
        `http://localhost:3005/application-form/applicationId/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Fetching application form failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async isApplicationSubmitted(applicationId, token) {
    try {
      const result = await axios.get(
        `http://localhost:3005/activity/status/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Getting application activity status failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async resubmitApplication(applicationId, application, token) {
    try {
      const result = await axios.put(
        `http://localhost:3005/application-form/${applicationId}`,
        application,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Resubmitting an application form failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async updateApplication(applicationId, application, token) {
    try {
      const result = await axios.put(
        `http://localhost:3005/application-form/submit/${applicationId}`,
        application,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Updating an application form failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async saveApplication(applicationId, application, token) {
    try {
      const result = await axios.put(
        `http://localhost:3005/application-form/save-application/${applicationId}`,
        application,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Updating an application form failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async getApplicationByUserId(userId, token) {
    try {
      const result = await axios.get(
        `http://localhost:3005/application/user-applications/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Archiving of application failed. Please try again.";
      throw new Error(errorMessage);
    }
  }
}

export default ApplicationAPI;
