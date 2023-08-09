import { configureStore } from "@reduxjs/toolkit";
import mcqReducer from "./reducers/mcqSlice";
import categorizeReducer from "./reducers/categorizeSlice";
import questionReducer from "./reducers/questionSlice";

export default configureStore({
  reducer: {
    question: questionReducer,
    mcq: mcqReducer,
    categorize: categorizeReducer,
  },
});
