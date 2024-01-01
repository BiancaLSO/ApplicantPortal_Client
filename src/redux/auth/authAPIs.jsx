import axios from "axios";

class UsersAPI {
  static async signupUser(userCredentials) {
    try {
      const result = await axios.post(
        `http://localhost:3005/auth/signup`,
        userCredentials
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
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
      console.log("back from server", result.data);

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
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Getting a user by credentialsId failed. Please try again.";
      throw new Error(errorMessage);
    }
  }
}

export default UsersAPI;
