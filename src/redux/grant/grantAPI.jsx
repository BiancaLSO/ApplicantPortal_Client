import axios from "axios";

class GrantAPI {
  static async getGrants(token) {
    console.log(token);
    try {
      const result = await axios.get(`http://localhost:3005/grant`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
}

export default GrantAPI;
