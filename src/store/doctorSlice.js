import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import doctorApi from "../api/doctorApi";

const initialState = {
  featured: [],
  allDoctors: [],
  loading: false,
  error: null
};

export const fetchFeaturedDoctors = createAsyncThunk(
  "doctors/fetchFeatured",
  async (_, thunkAPI) => {
    try {
      const response = await doctorApi.getFeatured();
      return response.doctors;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load doctors");
    }
  }
);

export const fetchAllDoctors = createAsyncThunk("doctors/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await doctorApi.getAll();
    return response.doctors;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load doctors");
  }
});

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeaturedDoctors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchFeaturedDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllDoctors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.allDoctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default doctorSlice.reducer;

