import { createSlice } from "@reduxjs/toolkit";
import { ComponentTypes } from "../../enums/ComponentTypes";

const INITIAL_STATE = {
  CATEGORIZE: {},
  MCQ: {},
  responses: [],
  answeringIndex: 0,
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
    SYNC_MCQ_STATE: (state, action) => {
      state.MCQ = action.payload;
    },
    RESET_MCQ_STATE: (state, action) => {
      state.MCQ = INITIAL_STATE.MCQ;
    },
    ANSWER_NEXT: (state, action) => {
      state.answeringIndex++;
      state.CATEGORIZE = INITIAL_STATE.CATEGORIZE;
      state.MCQ = INITIAL_STATE.MCQ;
    },
    ANSWER_PREVIOUS: (state, action) => {
      state.answeringIndex--;
      state.CATEGORIZE = INITIAL_STATE.CATEGORIZE;
      state.MCQ = INITIAL_STATE.MCQ;
    },
    SAVE_RESPONSE: (state, action) => {
      const { type } = action.payload;
      if (type == ComponentTypes.CATEGORIZE) {
        state.responses[state.answeringIndex] = state.CATEGORIZE;
      } else if (type == ComponentTypes.MCQ) {
        state.responses[state.answeringIndex] = state.MCQ;
      }
    },
  },
});

export const {
  SYNC_CATEGORIZE_STATE,
  RESET_CATEGORIZE_STATE,
  SYNC_MCQ_STATE,
  RESET_MCQ_STATE,
  ANSWER_NEXT,
  ANSWER_PREVIOUS,
  SAVE_RESPONSE,
} = respondSlice.actions;
export default respondSlice.reducer;
