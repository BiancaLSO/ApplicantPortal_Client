import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GrantAPI from "./grantAPI";

const initialState = {
  grant: [],
};

export const getGrants = createAsyncThunk("grant", async ({ token }) => {
  try {
    const response = await GrantAPI.getGrants(token);
    return response;
  } catch (error) {
    console.error("Error fetching grants:", error);
    throw new Error("Fetching grants failed");
  }
});

const grantSlice = createSlice({
  name: "grant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGrants.fulfilled, (state, action) => {
      state.grant = action.payload;
    });

    builder.addCase(getGrants.rejected, (state, action) => {
      state.error = "Fetching grants failed";
    });
  },
});

export const { reducer: grantReducer, actions } = grantSlice;
export default grantSlice.reducer;
