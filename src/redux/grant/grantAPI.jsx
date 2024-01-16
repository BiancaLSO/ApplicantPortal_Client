import axios from "axios";

class GrantAPI {
  static async getGrants(token) {
    try {
      const result = await axios.get(`http://localhost:3005/grant`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message || "Fetching grant failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async getGrant(grantId, token) {
    try {
      const result = await axios.get(`http://localhost:3005/grant/${grantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message || "Fetching grant failed. Please try again.";
      throw new Error(errorMessage);
    }
  }
}

export default GrantAPI;
