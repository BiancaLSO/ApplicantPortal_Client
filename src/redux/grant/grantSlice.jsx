import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GrantAPI from "./grantAPI";

const initialState = {
  grants: [],
};

export const getGrants = createAsyncThunk("grants", async ({ token }) => {
  try {
    const response = await GrantAPI.getGrants(token);
    console.log("grants from slice", response);
    return response;
  } catch (error) {
    console.error("Error fetching grants:", error);
    throw new Error("Fetching grants failed");
  }
});

const grantSlice = createSlice({
  name: "grants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGrants.fulfilled, (state, action) => {
      state.grants = action.payload;
      state.error = null;
    });

    builder.addCase(getGrants.rejected, (state, action) => {
      state.grants = [];
      state.error = action.error.message || "Fetching grants failed";
    });
  },
});

export const { reducer: grantReducer, actions } = grantSlice;
export default grantSlice.reducer;
