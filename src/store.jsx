// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/auth/authSlice";
import { applicationReducer } from "./redux/application/applicationSlice";
import { notificationReducer } from "./redux/notifications/notificationsSlice";
import { grantReducer } from "./redux/grant/grantSlice";
import { categoryReducer } from "./redux/category/categorySlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    notifications: notificationReducer,
    grants: grantReducer,
    categories: categoryReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
