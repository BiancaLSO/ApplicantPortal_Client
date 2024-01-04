import axios from "axios";

class CategoryAPI {
  static async getCategories(token) {
    try {
      const result = await axios.get(`http://localhost:3005/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (error) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message ||
        "Fetching categories failed. Please try again.";
      throw new Error(errorMessage);
    }
  }
}

export default CategoryAPI;
