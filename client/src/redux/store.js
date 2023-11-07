import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSLice = createSlice({
  name: "auth",
  initialState: {
    islogin: false,
  },
  reducers: {
    login(state) {
      state.islogin = true;
    },
    logout(state) {
      state.islogin = false;
    },
  },
});

export const authActions = authSLice.actions;

export const store = configureStore({
  reducer: authSLice.reducer,
});
