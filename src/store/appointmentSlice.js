import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentApi from "../api/appointmentApi";


const formatAppointment = appointment => {
  if (!appointment) return appointment;
  const doctor = appointment.doctorId && typeof appointment.doctorId === 'object' ? appointment.doctorId : null;
  const patient = appointment.patientId && typeof appointment.patientId === 'object' ? appointment.patientId : null;
  return {
    ...appointment,
    id: appointment.id || appointment._id || appointment.trackingId,
    patientId: patient?._id || appointment.patientId,
    doctorId: doctor?._id || appointment.doctorId,
    patientName: patient?.name || appointment.patientName || 'Patient',
    doctorName: doctor?.name || appointment.doctorName || 'Doctor',
    doctorSpecialty: doctor?.specialty || appointment.doctorSpecialty || 'General'
  };
};

const initialState = {
  doctorAppointments: [],
  patientAppointments: [],
  trackedAppointment: null,
  loading: false,
  error: null
};

export const fetchDoctorAppointments = createAsyncThunk(
  "appointments/fetchDoctorAppointments",
  async (_, thunkAPI) => {
    try {
      const response = await appointmentApi.getDoctorAppointments();
      return response.appointments.map(formatAppointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load appointments");
    }
  }
);

export const fetchPatientAppointments = createAsyncThunk(
  "appointments/fetchPatientAppointments",
  async (_, thunkAPI) => {
    try {
      const response = await appointmentApi.getPatientAppointments();
      return response.appointments.map(formatAppointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load appointments");
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await appointmentApi.updateStatus(id, status);
      return formatAppointment(response.appointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to update appointment");
    }
  }
);

export const trackAppointment = createAsyncThunk(
  "appointments/track",
  async (trackingId, thunkAPI) => {
    try {
      const response = await appointmentApi.trackAppointment(trackingId);
      return formatAppointment(response.appointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "No appointment found");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearTrackedAppointment(state) {
      state.trackedAppointment = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDoctorAppointments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorAppointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPatientAppointments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.patientAppointments = action.payload;
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.doctorAppointments = state.doctorAppointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        );
        state.patientAppointments = state.patientAppointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        );
        if (state.trackedAppointment?.id === action.payload.id) {
          state.trackedAppointment = action.payload;
        }
      })
      .addCase(trackAppointment.pending, state => {
        state.loading = true;
        state.error = null;
        state.trackedAppointment = null;
      })
      .addCase(trackAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.trackedAppointment = action.payload;
      })
      .addCase(trackAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearTrackedAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;

