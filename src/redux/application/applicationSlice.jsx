// store.js
import {
  configureStore,
  createSlice,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import ApplicationAPI from "./applicationAPI";

// Define your initial state
const initialState = {
  applicationId: null,
  application: null,
  applicationForm: null,
  hasBeenSubmitted: undefined,
  error: null,
  msg: null,
};

// Thunk to handle login and save token
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
      // Handle errors here
      throw new Error("Fetching application failed");
    }
  }
);

export const getApplicationForm = createAsyncThunk(
  "application-form",
  async ({ applicationId, token }) => {
    console.log(token);
    try {
      if (applicationId) {
        const applicationForm = await ApplicationAPI.getApplicationForm(
          applicationId,
          token
        );

        return applicationForm;
      }
    } catch (error) {
      // Handle errors here
      throw new Error("Error fetching application form data");
    }
  }
);

// Thunk to handle login and save token
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
      // Handle errors here
      throw new Error("Getting application activity status failed");
    }
  }
);

export const resubmitApplication = createAsyncThunk(
  "application/id/application",
  async ({ applicationId, application, token }, { dispatch }) => {
    try {
      // Call your login API here and return the response
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

      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Application resubmission failed");
    }
  }
);

export const updateApplication = createAsyncThunk(
  "application/saveApplication/submit/id",
  async ({ applicationId, application, token }, { dispatch }) => {
    try {
      console.log("helloooo");
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
      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Application resubmission failed");
    }
  }
);

export const saveApplication = createAsyncThunk(
  "application/saveApplication/update/id",
  async ({ applicationId, application, token }, { dispatch }) => {
    try {
      console.log("helloooo");
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
      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Application resubmission failed");
    }
  }
);

export const archiveApplication = createAsyncThunk(
  "application/archive/id",
  async ({ applicationId, value, token }, { dispatch }) => {
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
      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Application archiving failed");
    }
  }
);

export const setApplicationId = createAsyncThunk(
  "application/setApplicationId",
  async ({ applicationId, token }, { dispatch }) => {
    console.log(applicationId);
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

// Thunk to fetch user data based on userId

// Create a slice to manage the state
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
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
  },
});

export const { reducer: applicationReducer, actions } = applicationSlice;
export default applicationSlice.reducer;
