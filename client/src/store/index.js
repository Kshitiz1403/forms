import { configureStore } from "@reduxjs/toolkit";
import mcqReducer from "./reducers/mcqSlice";
import categorizeReducer from "./reducers/categorizeSlice";
import questionReducer from "./reducers/questionSlice";
import formReducer from "./reducers/formSlice";

export default configureStore({
  reducer: {
    form: formReducer,
    question: questionReducer,
    mcq: mcqReducer,
    categorize: categorizeReducer,
  },
});
