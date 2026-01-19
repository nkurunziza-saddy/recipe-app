import { createSlice } from "@reduxjs/toolkit";

import type { UserResponse } from "../../types/auth";

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("logged-in-user") || "null"),
  accessToken: JSON.parse(localStorage.getItem("logged-in-token") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("logged-in-user", JSON.stringify(action.payload.user));
      localStorage.setItem("logged-in-token", JSON.stringify(action.payload.accessToken));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("logged-in-user");
      localStorage.removeItem("logged-in-token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.accessToken;