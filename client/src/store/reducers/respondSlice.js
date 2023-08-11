import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  CATEGORIZE: {},
  MCQ: {},
};

export const respondSlice = createSlice({
  name: "respond",
  initialState: INITIAL_STATE,
  reducers: {
    SYNC_CATEGORIZE_STATE: (state, action) => {
      state.CATEGORIZE = action.payload;
    },
    RESET_CATEGORIZE_STATE: (state, action) => {
      state.CATEGORIZE = INITIAL_STATE.CATEGORIZE;
    },
  },
});

export const { SYNC_CATEGORIZE_STATE, RESET_CATEGORIZE_STATE } =
  respondSlice.actions;
export default respondSlice.reducer;
