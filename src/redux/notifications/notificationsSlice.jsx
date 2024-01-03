// store.js
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import NotificationsAPI from "./notificationsAPI";

// Define your initial state
const initialState = {
  notifications: null,
  error: null,
};

// Thunk to handle login and save token
export const getNotifications = createAsyncThunk(
  "notification",
  async ({ userId, token }) => {
    try {
      // Call your login API here and return the response
      const response = await NotificationsAPI.getNotifications(userId, token);
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Fetching notifications failed");
    }
  }
);

export const readNotification = createAsyncThunk(
  "notification/isRead",
  async ({ notificationId, userId, token }, { dispatch }) => {
    console.log("the id", userId);
    try {
      const response = await NotificationsAPI.readNotification(
        notificationId,
        true,
        token
      );
      dispatch(getNotifications({ userId, token }));
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Error updating the isRead notification column.");
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async ({ notificationId, userId, token }, { dispatch }) => {
    console.log("the id", userId);
    try {
      const response = await NotificationsAPI.deleteNotification(
        notificationId,
        token
      );
      dispatch(getNotifications({ userId, token }));
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Error deleting notification.");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.error = null;
    });

    builder.addCase(readNotification.fulfilled, (state, action) => {
      state.error = null;
    });

    builder.addCase(getNotifications.rejected, (state, action) => {
      state.error = "Error when getting notification for the user";
    });

    builder.addCase(readNotification.rejected, (state, action) => {
      state.error = "Error when updating isRead on notification";
    });
  },
});

export const { reducer: notificationReducer, actions } = notificationSlice;
export default notificationSlice.reducer;
