import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appointmentReducer from "./appointmentSlice";
import doctorReducer from "./doctorSlice";
import blogReducer from "./blogSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    blogs: blogReducer,
    admin: adminReducer
  }
});

export default store;

