import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import UsersAPI from "./authAPIs";

const initialState = {
  token: undefined,
  credentialsId: null,
  error: null,
  signupResponse: undefined,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userCredentials) => {
    try {
      const response = await UsersAPI.signupUser(userCredentials);
      return response;
    } catch (error) {
      throw new Error("Signup failed");
    }
  }
);

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async ({ credentialsId }) => {
    try {
      const user = await UsersAPI.getUser(credentialsId);
      return user;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userCredentials, { dispatch }) => {
    try {
      const response = await UsersAPI.loginUser(userCredentials);
      dispatch(getUserData({ credentialsId: response.id }));

      return response;
    } catch (error) {
      throw new Error("Login failed");
    }
  }
);

export const getUserDetails = createAsyncThunk("users/id", async (userId) => {
  try {
    const response = await UsersAPI.getUserDetails(userId);
    return response;
  } catch (error) {
    throw new Error("Fetching user details failed");
  }
});

export const editUser = createAsyncThunk(
  "users/edit",
  async ({ userId, userBody, addressBody }, { dispatch }) => {
    try {
      const response = await UsersAPI.editUserDetails(userId, userBody);
      dispatch(
        editAddress({
          userId: response.id,
          addressId: response.address.id,
          addressBody: addressBody,
        })
      );
      return response;
    } catch (error) {
      throw new Error("Editing user failed");
    }
  }
);

export const editAddress = createAsyncThunk(
  "users/address",
  async ({ userId, addressId, addressBody }, { dispatch }) => {
    try {
      const response = await UsersAPI.editUserAddress(addressId, addressBody);
      dispatch(getUserDetails(userId));

      return response;
    } catch (error) {
      throw new Error("Error editing user address data");
    }
  }
);

export const resetTokenState = createAsyncThunk("auth/logout", async (type) => {
  return type;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupResponse = action.payload;
      if (action.payload.id !== undefined) state.error = "Signup success!";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.credentialsId = action.payload.id;
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

    builder.addCase(resetTokenState.fulfilled, (state, action) => {
      state.token = action.payload;
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
