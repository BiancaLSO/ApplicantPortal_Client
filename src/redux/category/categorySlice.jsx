import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryAPI from "./categoryAPI";

const initialState = {
  categories: [],
  error: null,
};

export const getCategories = createAsyncThunk(
  "categories",
  async ({ token }) => {
    try {
      const response = await CategoryAPI.getCategories(token);
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Fetching categories failed");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.error = null;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.categories = [];
      state.error = action.error.message || "Fetching categories failed";
    });
  },
});

export const { reducer: categoryReducer, actions } = categorySlice;
export default categorySlice.reducer;
