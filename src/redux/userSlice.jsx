import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
  currentUser:
    JSON.parse(sessionStorage.getItem("currentUser")) || null,

  isLoggedIn:
    !!sessionStorage.getItem("currentUser"),
};
const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      state.isLoggedIn = true;

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload)
      );
    },

    logout(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem("currentUser");
    },

    updateProfile(state, action) {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(state.currentUser)
      );
    },
  },
});

export const { login, logout, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;