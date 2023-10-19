import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "inactive",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = "active";
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.status = "inactive";
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
