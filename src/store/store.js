import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice.js";

const store = configureStore({
  reducer: authReducers,
});

export default store;
