import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  options: [],
  correctIndex: null,
};

export const mcqSlice = createSlice({
  name: "mcq",
  initialState: INITIAL_STATE,
  reducers: {
    ADD_OPTION: (state, action) => {
      state.options.push("");
    },
    EDIT_OPTION: (state, action) => {
      const { index, content } = action.payload;
      state.options[index] = content;
    },
    REMOVE_OPTION: (state, action) => {
      const index = action.payload;
      state.options.splice(index, 1);

      if (state.correctIndex == index) state.correctIndex = null;
    },
    SELECT_CORRECT_OPTION: (state, action) => {
      const index = action.payload;
      state.correctIndex = index;
    },
  },
});

export const { ADD_OPTION, EDIT_OPTION, REMOVE_OPTION, SELECT_CORRECT_OPTION } =
  mcqSlice.actions;
export default mcqSlice.reducer;
