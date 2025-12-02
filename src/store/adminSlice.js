import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../api/adminApi";

// Normalize MongoDB document to have consistent id field
const normalizeDoc = (doc) => {
  if (!doc) return doc;
  return {
    ...doc,
    id: doc.id || doc._id?.toString() || doc._id,
    _id: doc._id?.toString() || doc._id
  };
};

// Normalize appointment with populated fields
const normalizeAppointment = (appointment) => {
  if (!appointment) return appointment;
  const normalized = normalizeDoc(appointment);
  const patient = appointment.patientId && typeof appointment.patientId === 'object' ? normalizeDoc(appointment.patientId) : null;
  const doctor = appointment.doctorId && typeof appointment.doctorId === 'object' ? normalizeDoc(appointment.doctorId) : null;
  
  return {
    ...normalized,
    patientId: patient?._id || patient?.id || appointment.patientId,
    doctorId: doctor?._id || doctor?.id || appointment.doctorId,
    patientName: patient?.name || appointment.patientName || 'Patient',
    doctorName: doctor?.name || appointment.doctorName || 'Doctor',
    doctorSpecialty: doctor?.specialty || appointment.doctorSpecialty || 'General'
  };
};

const initialState = {
  stats: null,
  users: [],
  appointments: [],
  contacts: [],
  analytics: null,
  loading: false,
  error: null,
};

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, thunkAPI) => {
    try {
      const response = await adminApi.getStats();
      return response.stats;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load stats");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (params, thunkAPI) => {
    try {
      const response = await adminApi.getAllUsers(params);
      // Normalize users to have consistent id field
      return Array.isArray(response.users) ? response.users.map(normalizeDoc) : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load users");
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  "admin/fetchAppointments",
  async (params, thunkAPI) => {
    try {
      const response = await adminApi.getAllAppointments(params);
      // Normalize appointments with populated fields
      return Array.isArray(response.appointments) ? response.appointments.map(normalizeAppointment) : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to load appointments"
      );
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "admin/fetchContacts",
  async (params, thunkAPI) => {
    try {
      const response = await adminApi.getContacts(params);
      return response.contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load contacts");
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  "admin/fetchAnalytics",
  async (_, thunkAPI) => {
    try {
      const response = await adminApi.getAnalytics();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load analytics");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;

