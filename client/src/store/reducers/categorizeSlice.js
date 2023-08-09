import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  categories: [],
  items: [],
};

export const categorizeSlice = createSlice({
  name: "categorize",
  initialState: INITIAL_STATE,
  reducers: {
    ADD_CATEGORY: (state, action) => {
      state.categories.push("");
    },
    REMOVE_CATEGORY: (state, action) => {
      const index = action.payload;
      state.categories.splice(index, 1);
    },
    EDIT_CATEGORY: (state, action) => {
      const { index, content } = action.payload;
      state.categories[index] = content;
    },
    ADD_ITEM: (state, action) => {
      const item = { item: "", belongsTo: "" };
      state.items.push(item);
    },
    EDIT_ITEM: (state, action) => {
      const { content, index } = action.payload;
      const mapping = state.items[index];
      mapping.item = content;
      state.items[index] = mapping;
    },
    REMOVE_ITEM: (state, action) => {
      const index = action.payload;
      state.items.splice(index, 1);
    },
    MAP_BELONGING: (state, action) => {
      const { index, category } = action.payload;
      state.items[index].belongsTo = category;
    },
  },
});

export const {
  ADD_CATEGORY,
  ADD_ITEM,
  EDIT_CATEGORY,
  EDIT_ITEM,
  MAP_BELONGING,
  REMOVE_CATEGORY,
  REMOVE_ITEM,
} = categorizeSlice.actions;
export default categorizeSlice.reducer;
