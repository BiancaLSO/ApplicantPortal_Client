import axios from "axios";

class NotificationsAPI {
  static async getNotifications(userId, token) {
    try {
      const result = await axios.get(
        `http://localhost:3005/notification/userId/${userId}`,
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
        "Fetching notifications failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async readNotification(notificationId, value, token) {
    console.log(value);
    try {
      const body = { isRead: value };
      const result = await axios.patch(
        `http://localhost:3005/notification/${notificationId}`,
        body,
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
        "Changing isRead of notification failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async deleteNotification(notificationId, token) {
    try {
      const result = await axios.delete(
        `http://localhost:3005/notification/${notificationId}`,
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
        "Deleting a notification failed. Please try again.";
      throw new Error(errorMessage);
    }
  }
}

export default NotificationsAPI;
