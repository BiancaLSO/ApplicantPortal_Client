// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/auth/authSlice";
import { applicationReducer } from "./redux/application/applicationSlice";
import { notificationReducer } from "./redux/notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    notifications: notificationReducer,
    // Add other reducers if needed
  },
});

export default store;
