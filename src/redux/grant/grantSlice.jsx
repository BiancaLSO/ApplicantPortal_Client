import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GrantAPI from "./grantAPI";

const initialState = {
  grants: [],
  grant: {},
};

export const getGrants = createAsyncThunk("grants", async ({ token }) => {
  try {
    const response = await GrantAPI.getGrants(token);
    return response;
  } catch (error) {
    console.error("Error fetching grants:", error);
    throw new Error("Fetching grants failed");
  }
});

export const getGrantById = createAsyncThunk(
  "grant/grantId",
  async ({ grantId, token }) => {
    try {
      const response = await GrantAPI.getGrant(grantId, token);
      return response;
    } catch (error) {
      console.error("Error fetching a grant:", error);
      throw new Error("Fetching a grant failed");
    }
  }
);

export const resetGrantState = createAsyncThunk(
  "application/resetId",
  async (type) => {
    return type;
  }
);

const grantSlice = createSlice({
  name: "grants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGrants.fulfilled, (state, action) => {
      state.grants = action.payload;
      state.error = null;
    });

    builder.addCase(getGrantById.fulfilled, (state, action) => {
      state.grant = action.payload;
      state.error = null;
    });

    builder.addCase(resetGrantState.fulfilled, (state, action) => {
      state.grant = action.payload;
    });

    builder.addCase(getGrants.rejected, (state, action) => {
      state.grants = [];
      state.error = action.error.message || "Fetching grants failed";
    });

    builder.addCase(getGrantById.rejected, (state, action) => {
      state.grant = {};
      state.error = action.error.message || "Fetching a grant by id failed";
    });
  },
});

export const { reducer: grantReducer, actions } = grantSlice;
export default grantSlice.reducer;
