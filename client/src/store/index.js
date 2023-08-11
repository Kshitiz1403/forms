import { configureStore } from "@reduxjs/toolkit";
import mcqReducer from "./reducers/mcqSlice";
import categorizeReducer from "./reducers/categorizeSlice";
import questionReducer from "./reducers/questionSlice";
import formReducer from "./reducers/formSlice";
import snackbarReducer from "./reducers/snackbarSlice";
import respondReducer from "./reducers/respondSlice";

export default configureStore({
  reducer: {
    form: formReducer,
    respond:respondReducer,
    question: questionReducer,
    mcq: mcqReducer,
    categorize: categorizeReducer,
    snackbar:snackbarReducer
  },
});
