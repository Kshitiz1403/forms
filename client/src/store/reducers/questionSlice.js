import { createSlice } from "@reduxjs/toolkit";
import { ComponentTypes } from "../../enums/ComponentTypes";

const INITIAL_STATE = {
  questionType: Object.values(ComponentTypes)[0],
  question: "",
};

export const questionSlice = createSlice({
  name: "question",
  initialState: INITIAL_STATE,
  reducers: {
    SWITCH_TYPE: (state, action) => {
      const type = action.payload;
      state.questionType = type;
    },
    UPDATE_QUESTION: (state, action) => {
      const question = action.payload;
      state.question = question;
    },
    RESET: () => INITIAL_STATE,
  },
});

export const { SWITCH_TYPE, UPDATE_QUESTION } = questionSlice.actions;
export const questionActions = questionSlice.actions;
export default questionSlice.reducer;
