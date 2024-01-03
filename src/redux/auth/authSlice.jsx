// store.js
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import UsersAPI from "./authAPIs";

// Define your initial state
const initialState = {
  token: undefined,
  credentialsId: null,
  error: null,
};

// Thunk to handle login and save token
export const signup = createAsyncThunk(
  "auth/signup",
  async (userCredentials) => {
    try {
      // Call your login API here and return the response
      const response = await UsersAPI.signupUser(userCredentials);

      // Return the token
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Signup failed");
    }
  }
);

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (credentialsId, { dispatch }) => {
    try {
      // Call your API to fetch user data using userId
      const user = await UsersAPI.getUser(credentialsId);

      // Dispatch an action to store the user data in the Redux store
      dispatch(setUser(user));

      // Return the user data
      return user;
    } catch (error) {
      // Handle errors here
      throw new Error("Error fetching user data");
    }
  }
);

// Thunk to handle login and save token
export const login = createAsyncThunk(
  "auth/login",
  async (userCredentials, { dispatch }) => {
    try {
      // Call your login API here and return the response
      const response = await UsersAPI.loginUser(userCredentials);

      // Save token to local storage
      localStorage.setItem("token", response.token);

      // Dispatch another action after updating the state
      dispatch(getUserData(response.id));

      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Login failed");
    }
  }
);

// Thunk to fetch user data based on userId

// Create a slice to manage the state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      state.error = null;
      if (action.payload.id !== undefined) state.error = "Signup success!";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.credentialsId = action.payload.id;
      console.log("the state", state.credentialsId);
      state.error = null;
    });

    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.error = "Signup failed";
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = "Login failed";
    });

    builder.addCase(getUserData.rejected, (state, action) => {
      state.error = "Error fetching user data";
    });
  },
});

export const { reducer: authReducer, actions } = authSlice;
export const { setUser } = actions;
export default authSlice.reducer;
