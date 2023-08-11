import { useDispatch, useSelector } from "react-redux";
import { ComponentTypes } from "../enums/ComponentTypes";
import { categorizeActions } from "../store/reducers/categorizeSlice";
import { mcqActions } from "../store/reducers/mcqSlice";
import { questionActions } from "../store/reducers/questionSlice";
import { ADD_COMPONENT } from "../store/reducers/formSlice";
import { SHOW_SNACKBAR } from "../store/reducers/snackbarSlice";
import config from "../config";

const useQuestion = () => {
  const questionState = useSelector((state) => state.question);
  const mcqState = useSelector((state) => state.mcq);
  const categorizeState = useSelector((state) => state.categorize);
  const formId = useSelector((state) => state.form.formId);

  const dispatch = useDispatch();

  const addQuestion = async () => {
    const { questionType, question } = questionState;
    const component = {
      type: questionType,
      question,
    };
    switch (questionType) {
      case ComponentTypes.CATEGORIZE: {
        const { categories, items } = categorizeState;
        component["categories"] = categories;
        const correctAnswers = {};
        items.map(({ item, belongsTo }) => {
          correctAnswers[item] = belongsTo;
        });
        component["correctAnswers"] = correctAnswers;
        break;
      }
      case ComponentTypes.MCQ: {
        const { options, correctIndex } = mcqState;
        component["correctIndex"] = correctIndex;
        component["options"] = options;
        break;
      }
    }

    const response = await fetch(
      `${config.BASE_URI}/forms/question?id=${formId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...component,
        }),
      }
    );
    const data = (await response.json()).data;

    dispatch(ADD_COMPONENT(component));

    dispatch(
      SHOW_SNACKBAR({
        severity: "success",
        message: "Question Added",
        autoHideDuration: 2000,
      })
    );

    dispatch(categorizeActions.RESET());
    dispatch(mcqActions.RESET());
    dispatch(questionActions.RESET());
  };

  return { addQuestion };
};

export default useQuestion;
