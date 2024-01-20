import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationsAPI from "./notificationsAPI";

const initialState = {
  notifications: null,
  error: null,
};

export const getNotifications = createAsyncThunk(
  "notification",
  async ({ userId, token }) => {
    try {
      const response = await NotificationsAPI.getNotifications(userId, token);
      return response;
    } catch (error) {
      throw new Error("Fetching notifications failed");
    }
  }
);

export const readNotification = createAsyncThunk(
  "notification/isRead",
  async ({ notificationId, userId, token }, { dispatch }) => {
    try {
      const response = await NotificationsAPI.readNotification(
        notificationId,
        true,
        token
      );
      dispatch(getNotifications({ userId, token }));
      return response;
    } catch (error) {
      throw new Error("Error updating the isRead notification column.");
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async ({ notificationId, userId, token }, { dispatch }) => {
    try {
      const response = await NotificationsAPI.deleteNotification(
        notificationId,
        token
      );
      dispatch(getNotifications({ userId, token }));
      return response;
    } catch (error) {
      throw new Error("Error deleting notification.");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
