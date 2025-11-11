import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogApi from "../api/blogApi";

const initialState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null
};

export const fetchBlogPosts = createAsyncThunk("blogs/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await blogApi.getAll();
    return response.posts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load blog posts");
  }
});

export const fetchBlogPost = createAsyncThunk("blogs/fetchOne", async (slug, thunkAPI) => {
  try {
    const response = await blogApi.getBySlug(slug);
    return response.post;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to find blog post");
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogPost.pending, state => {
        state.loading = true;
        state.error = null;
        state.selectedPost = null;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedPost } = blogSlice.actions;
export default blogSlice.reducer;

