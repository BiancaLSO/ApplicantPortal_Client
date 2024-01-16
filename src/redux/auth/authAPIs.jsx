import axios from "axios";

class UsersAPI {
  static async signupUser(userCredentials) {
    try {
      const result = await axios.post(
        `http://localhost:3005/auth/signup`,
        userCredentials
      );

      return result.data;
    } catch (error) {
      console.error("Error during signupUser request:", error);
      const errorResponse = error.response.data || {};
      const errorMessage =
        errorResponse.message || "Sign-up failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async loginUser(userCredentials) {
    try {
      const result = await axios.post(
        `http://localhost:3005/auth/login`,
        userCredentials
      );

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message || "Login failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async getUser(credentialsId) {
    try {
      const result = await axios.get(
        `http://localhost:3005/user/credentials/${credentialsId}/user`
      );

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Getting a user by credentialsId failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async getUserDetails(userId) {
    try {
      const result = await axios.get(`http://localhost:3005/user/${userId}`);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Getting a user by userId failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async editUserDetails(userId, body) {
    try {
      const result = await axios.patch(
        `http://localhost:3005/user/${userId}`,
        body
      );

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Editing a user by userId failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async editUserAddress(userAddressId, body) {
    try {
      const result = await axios.patch(
        `http://localhost:3005/address/${userAddressId}`,
        body
      );

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Editing a user address by userAddressId failed. Please try again.";
      throw new Error(errorMessage);
    }
  }
}

export default UsersAPI;
