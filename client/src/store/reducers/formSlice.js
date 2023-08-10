import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  formId: "",
  components: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState: INITIAL_STATE,
  reducers: {
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

export const { CREATE_FORM, ADD_COMPONENT } = formSlice.actions;
export default formSlice.reducer;
