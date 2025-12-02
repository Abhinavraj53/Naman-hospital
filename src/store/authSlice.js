import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  error: null,
  registrationMessage: null,
  pendingEmail: null,
  verificationMessage: null
};

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await authApi.login(credentials);
    // Ensure response has required fields
    if (!response || !response.user || !response.token) {
      return thunkAPI.rejectWithValue("Invalid response from server");
    }
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Login failed";
    console.error("Login error:", error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const register = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const response = await authApi.register(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.requestPasswordReset(payload);
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Request failed");
    }
  }
);

export const verifyEmail = createAsyncThunk("auth/verifyEmail", async (token, thunkAPI) => {
  try {
    const response = await authApi.verifyEmail(token);
    return response.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Verification failed");
  }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (payload, thunkAPI) => {
  try {
    const response = await authApi.resetPassword(payload);
    return response.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Reset failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  // Clear localStorage immediately
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  // Try API call but don't fail if it errors
  try {
    await authApi.logout();
  } catch (error) {
    // Ignore API errors, logout should always succeed client-side
    console.warn("Logout API call failed, but user is logged out locally:", error);
  }
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearRegistration(state) {
      state.registrationMessage = null;
      state.pendingEmail = null;
    },
    clearVerification(state) {
      state.verificationMessage = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize user object to have consistent id field
        const user = action.payload.user || {};
        const normalizedUser = {
          ...user,
          id: user.id || user._id?.toString() || user._id,
          _id: user._id?.toString() || user._id
        };
        state.user = normalizedUser;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        state.registrationMessage = null;
        state.pendingEmail = null;
        state.verificationMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
        state.registrationMessage = null;
        state.pendingEmail = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationMessage =
          action.payload?.message || "Registration successful! Please check your email to verify your account.";
        state.pendingEmail = action.payload?.email || action.meta?.arg?.email || null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationMessage = null;
        state.pendingEmail = null;
      })
      .addCase(requestPasswordReset.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, state => {
        state.loading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, state => {
        state.loading = true;
        state.error = null;
        state.verificationMessage = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationMessage = action.payload || "Email verified successfully!";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verificationMessage = null;
      })
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        // Clear state immediately when logout starts
        state.user = null;
        state.token = null;
      })
      .addCase(logout.fulfilled, state => {
        // Ensure state is cleared
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, state => {
        // Even if API fails, clear state
        state.user = null;
        state.token = null;
      });
  }
});

export const { clearError, clearRegistration, clearVerification } = authSlice.actions;
export default authSlice.reducer;

