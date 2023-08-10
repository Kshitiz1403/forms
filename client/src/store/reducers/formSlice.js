import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  formId: "",
  components: [],
  isLive: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState: INITIAL_STATE,
  reducers: {
    LOAD_FORM: (state, action) => {
      const { components, isLive, formId } = action.payload;
      state.formId = formId;
      state.components = components;
      state.isLive = isLive;
    },
    CREATE_FORM: (state, action) => {
      const { formId } = action.payload;
      state.formId = formId;
    },
    ADD_COMPONENT: (state, action) => {
      const component = action.payload;
      state.components.push(component);
    },
  },
});

export const { CREATE_FORM, ADD_COMPONENT, LOAD_FORM } = formSlice.actions;
export default formSlice.reducer;
