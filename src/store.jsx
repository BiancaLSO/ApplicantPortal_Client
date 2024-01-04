// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/auth/authSlice";
import { applicationReducer } from "./redux/application/applicationSlice";
import { notificationReducer } from "./redux/notifications/notificationsSlice";
import { grantReducer } from "./redux/grant/grantSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    notifications: notificationReducer,
    grants: grantReducer,
    // Add other reducers if needed
  },
});

export default store;
