import { createSlice } from "@reduxjs/toolkit";
import { ComponentTypes } from "../../enums/ComponentTypes";

const INITIAL_STATE = {
  CATEGORIZE: {},
  MCQ: {},
  SHORT_ANSWER: {},
  ESSAY: {},
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
    SYNC_MCQ_STATE: (state, action) => {
      state.MCQ = action.payload;
    },
    SYNC_SHORT_STATE: (state, action) => {
      state.SHORT_ANSWER = action.payload;
    },
    SYNC_ESSAY_STATE: (state, action) => {
      state.ESSAY = action.payload;
    },
    ANSWER_NEXT: (state, action) => {
      state.answeringIndex++;
      state.CATEGORIZE = INITIAL_STATE.CATEGORIZE;
      state.MCQ = INITIAL_STATE.MCQ;
      state.SHORT_ANSWER = INITIAL_STATE.SHORT_ANSWER;
      state.ESSAY = INITIAL_STATE.ESSAY;
    },
    ANSWER_PREVIOUS: (state, action) => {
      state.answeringIndex--;
      state.CATEGORIZE = INITIAL_STATE.CATEGORIZE;
      state.MCQ = INITIAL_STATE.MCQ;
      state.SHORT_ANSWER = INITIAL_STATE.SHORT_ANSWER;
      state.ESSAY = INITIAL_STATE.ESSAY;
    },
    SAVE_RESPONSE: (state, action) => {
      const { type } = action.payload;
      if (type == ComponentTypes.CATEGORIZE) {
        state.responses[state.answeringIndex] = JSON.parse(
          JSON.stringify(state.CATEGORIZE)
        );
      } else if (type == ComponentTypes.MCQ) {
        state.responses[state.answeringIndex] = JSON.parse(
          JSON.stringify(state.MCQ)
        );
      } else if (type == ComponentTypes.SHORT_ANSWER) {
        state.responses[state.answeringIndex] = JSON.parse(
          JSON.stringify(state.SHORT_ANSWER)
        );
      } else if (type == ComponentTypes.ESSAY) {
        state.responses[state.answeringIndex] = JSON.parse(
          JSON.stringify(state.ESSAY)
        );
      }
    },
    RESET_RESPOND_STATE: (state, action) => {
      return INITIAL_STATE;
    },
  },
});

export const {
  SYNC_CATEGORIZE_STATE,
  SYNC_MCQ_STATE,
  SYNC_SHORT_STATE,
  SYNC_ESSAY_STATE,
  ANSWER_NEXT,
  ANSWER_PREVIOUS,
  SAVE_RESPONSE,
  RESET_RESPOND_STATE,
} = respondSlice.actions;
export default respondSlice.reducer;
