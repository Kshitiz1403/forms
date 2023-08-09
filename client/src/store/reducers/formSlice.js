import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  formId: "",
  components: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState: INITIAL_STATE,
  reducers: {
    createForm: (state, action) => {
      const { formId } = action.payload;
      state.formId = formId;
    },
    addCategory:() =>{
      
    },
    addComponent: (state, action) => {
      const {} = action.payload;

    },
  },
});

export const { createForm } = formSlice.actions;
export default formSlice.reducer;
