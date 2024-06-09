import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSgc: localStorage.getItem("userSgc")
    ? JSON.parse(localStorage.getItem("userSgc"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userSgc = action.payload;
      localStorage.setItem("userSgc", JSON.stringify(state.userSgc));
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
