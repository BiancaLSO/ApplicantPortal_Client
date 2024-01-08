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
  signupResponse: undefined,
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
  async ({ credentialsId }) => {
    try {
      // Call your API to fetch user data using userId
      const user = await UsersAPI.getUser(credentialsId);

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

      console.log("the problme", response.id);
      // Dispatch another action after updating the state
      dispatch(getUserData({ credentialsId: response.id }));

      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Login failed");
    }
  }
);

export const getUserDetails = createAsyncThunk("users/id", async (userId) => {
  try {
    // Call your login API here and return the response
    const response = await UsersAPI.getUserDetails(userId);

    // Return both the token and credentialsId
    return response;
  } catch (error) {
    // Handle errors here
    throw new Error("Fetching user details failed");
  }
});

export const editUser = createAsyncThunk(
  "users/edit",
  async ({ userId, userBody, addressBody }, { dispatch }) => {
    try {
      console.log("hi there");
      // Call your login API here and return the response
      const response = await UsersAPI.editUserDetails(userId, userBody);
      console.log(response.address);
      // Dispatch another action after updating the state
      dispatch(
        editAddress({
          userId: response.id,
          addressId: response.address.id,
          addressBody: addressBody,
        })
      );

      // Return both the token and credentialsId
      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Editing user failed");
    }
  }
);

export const editAddress = createAsyncThunk(
  "users/address",
  async ({ userId, addressId, addressBody }, { dispatch }) => {
    try {
      // Call your API to fetch user data using userId
      const response = await UsersAPI.editUserAddress(addressId, addressBody);

      dispatch(getUserDetails(userId));

      return response;
    } catch (error) {
      // Handle errors here
      throw new Error("Error editing user address data");
    }
  }
);
// Thunk to fetch user data based on userId

// Create a slice to manage the state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupResponse = action.payload;
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

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
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

    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.error = "Error fetching user deyails";
    });
  },
});

export const { reducer: authReducer, actions } = authSlice;
export default authSlice.reducer;
