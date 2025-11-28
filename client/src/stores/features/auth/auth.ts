import { createSlice } from "@reduxjs/toolkit";
import type { AuthUserT } from "../../../types/types";

export const authUser = createSlice({
  name: "auth-user",
  initialState: {
    value: {
      status: false,
      user: {} as AuthUserT,
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.value.status = true;
      state.value.user = action.payload?.user;
    },
    clearAuthUser: (state) => {
      state.value.status = false;
      state.value.user = {} as any;
    },
    updateUser: (state, action) => {
      const currentUserData = state.value.user;
      state.value.user = { ...currentUserData, ...action?.payload?.user };
    },
  },
});

export const { addUser, clearAuthUser, updateUser } = authUser.actions;

export default authUser.reducer;
