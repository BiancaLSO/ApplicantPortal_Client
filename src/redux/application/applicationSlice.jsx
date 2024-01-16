import {
  configureStore,
  createSlice,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import ApplicationAPI from "./applicationAPI";
import { getNotifications } from "../notifications/notificationsSlice";

const initialState = {
  applicationId: null,
  application: null,
  applications: [],
  applicationForm: null,
  hasBeenSubmitted: undefined,
  error: null,
  msg: null,
};

export const getApplication = createAsyncThunk(
  "application",
  async ({ applicationId, token }) => {
    try {
      if (applicationId) {
        const response = await ApplicationAPI.getApplication(
          applicationId,
          token
        );
        return response;
      }
    } catch (error) {
      throw new Error("Fetching application failed");
    }
  }
);

export const getApplicationForm = createAsyncThunk(
  "application-form",
  async ({ applicationId, token }) => {
    try {
      if (applicationId) {
        const applicationForm = await ApplicationAPI.getApplicationForm(
          applicationId,
          token
        );

        return applicationForm;
      }
    } catch (error) {
      throw new Error("Error fetching application form data");
    }
  }
);

export const isApplicationSubmitted = createAsyncThunk(
  "activity/status",
  async ({ applicationId, token }) => {
    try {
      if (applicationId) {
        const response = await ApplicationAPI.isApplicationSubmitted(
          applicationId,
          token
        );
        return response;
      }
    } catch (error) {
      throw new Error("Getting application activity status failed");
    }
  }
);

export const resubmitApplication = createAsyncThunk(
  "application/id/application",
  async ({ applicationId, application, user, token }, { dispatch }) => {
    try {
      const response = await ApplicationAPI.resubmitApplication(
        applicationId,
        application,
        token
      );

      dispatch(
        getApplicationForm({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        getApplication({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        isApplicationSubmitted({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(getNotifications({ userId: user.id, token: token }));
      return response;
    } catch (error) {
      throw new Error("Application resubmission failed");
    }
  }
);

export const updateApplication = createAsyncThunk(
  "application/saveApplication/submit/id",
  async ({ applicationId, application, user, token }, { dispatch }) => {
    try {
      const response = await ApplicationAPI.updateApplication(
        applicationId,
        application,
        token
      );

      dispatch(
        getApplication({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        isApplicationSubmitted({
          applicationId: applicationId,
          token: token,
        })
      );

      dispatch(
        getApplicationForm({
          applicationId: applicationId,
          token: token,
        })
      );

      dispatch(getNotifications({ userId: user.id, token: token }));
      return response;
    } catch (error) {
      throw new Error("Application resubmission failed");
    }
  }
);

export const saveApplication = createAsyncThunk(
  "application/saveApplication/update/id",
  async ({ applicationId, application, user, token }, { dispatch }) => {
    try {
      const response = await ApplicationAPI.saveApplication(
        applicationId,
        application,
        token
      );

      dispatch(
        getApplication({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        isApplicationSubmitted({
          applicationId: applicationId,
          token: token,
        })
      );

      dispatch(
        getApplicationForm({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(getNotifications({ userId: user.id, token: token }));
      return response;
    } catch (error) {
      throw new Error("Application resubmission failed");
    }
  }
);

export const archiveApplication = createAsyncThunk(
  "application/archive/id",
  async ({ applicationId, value, user, token }, { dispatch }) => {
    try {
      const response = await ApplicationAPI.archiveApplication(
        applicationId,
        value,
        token
      );

      dispatch(
        getApplication({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        isApplicationSubmitted({
          applicationId: applicationId,
          token: token,
        })
      );

      dispatch(
        getApplicationForm({
          applicationId: applicationId,
          token: token,
        })
      );

      dispatch(getNotifications({ userId: user.id, token: token }));
      return response;
    } catch (error) {
      throw new Error("Application archiving failed");
    }
  }
);

export const setApplicationId = createAsyncThunk(
  "application/setApplicationId",
  async ({ applicationId, token }, { dispatch }) => {
    if (applicationId) {
      dispatch(
        getApplication({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        getApplicationForm({
          applicationId: applicationId,
          token: token,
        })
      );
      dispatch(
        isApplicationSubmitted({
          applicationId: applicationId,
          token: token,
        })
      );
    }
    return applicationId;
  }
);

export const setPopUpMsg = createAsyncThunk(
  "application/popup-msg",
  async (msg) => {
    return msg;
  }
);

export const resetIdState = createAsyncThunk(
  "application/resetId",
  async (type) => {
    return type;
  }
);

export const getApplicationByUserId = createAsyncThunk(
  "applicationByUserId",
  async ({ userId, token }) => {
    try {
      const applications = await ApplicationAPI.getApplicationByUserId(
        userId,
        token
      );

      return applications;
    } catch (error) {
      throw new Error("Error fetching application form data");
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplication.fulfilled, (state, action) => {
      state.application = action.payload;
      state.applicationId = action.payload.id;
    });

    builder.addCase(getApplicationForm.fulfilled, (state, action) => {
      state.applicationForm = action.payload;
    });

    builder.addCase(isApplicationSubmitted.fulfilled, (state, action) => {
      state.hasBeenSubmitted = action.payload;
    });

    builder.addCase(resubmitApplication.fulfilled, (state, action) => {
      state.applicationForm = action.payload;
      state.error = "Application succesfully resubmitted!";
    });

    builder.addCase(updateApplication.fulfilled, (state, action) => {
      state.applicationForm = action.payload;
      state.error = "Application successfully submitted!";
    });

    builder.addCase(saveApplication.fulfilled, (state, action) => {
      state.applicationForm = action.payload;
      state.error = "Your progress has been saved!";
    });

    builder.addCase(archiveApplication.fulfilled, (state, action) => {
      state.application = action.payload;
      state.error = "The application has now been archived.";
    });

    builder.addCase(setPopUpMsg.fulfilled, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(resetIdState.fulfilled, (state, action) => {
      state.applicationId = action.payload;
      state.applicationForm = action.payload;
      state.application = action.payload;
    });

    builder.addCase(setApplicationId.fulfilled, (state, action) => {
      state.applicationId = action.payload;
    });

    builder.addCase(getApplicationByUserId.fulfilled, (state, action) => {
      state.applications = action.payload;
    });

    builder.addCase(getApplication.rejected, (state, action) => {
      state.error = "Fetching application failed";
    });

    builder.addCase(getApplicationForm.rejected, (state, action) => {
      state.error = "Fetching application form failed";
    });

    builder.addCase(isApplicationSubmitted.rejected, (state, action) => {
      state.error = "Error when getting application activity status";
    });

    builder.addCase(resubmitApplication.rejected, (state, action) => {
      state.error = "Error when resubmitting the form";
    });

    builder.addCase(getApplicationByUserId.rejected, (state, action) => {
      state.error = "Error when fetching the applications by userId";
    });
  },
});

export const { reducer: applicationReducer, actions } = applicationSlice;
export default applicationSlice.reducer;
