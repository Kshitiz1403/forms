import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isShown: false,
  severity: "success",
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: INITIAL_STATE,
  reducers: {
    SHOW_SNACKBAR: (state, action) => {
      const { severity, autoHideDuration, message } = action.payload;
      state.isShown = true;
      state.severity = severity;
      state.message = message;
      state.autoHideDuration = autoHideDuration;
    },
    TOGGLE_SNACKBAR_CLOSE: (state, action) => {
      return INITIAL_STATE;
    },
  },
});

export const { SHOW_SNACKBAR, TOGGLE_SNACKBAR_CLOSE } = snackbarSlice.actions;
export default snackbarSlice.reducer;
