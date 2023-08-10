import { useDispatch, useSelector } from "react-redux";
import { ComponentTypes } from "../enums/ComponentTypes";
import { categorizeActions } from "../store/reducers/categorizeSlice";
import { mcqActions } from "../store/reducers/mcqSlice";
import { questionActions } from "../store/reducers/questionSlice";
import { ADD_COMPONENT } from "../store/reducers/formSlice";

const useQuestion = () => {
  const questionState = useSelector((state) => state.question);
  const mcqState = useSelector((state) => state.mcq);
  const categorizeState = useSelector((state) => state.categorize);

  const dispatch = useDispatch();

  const addQuestion = () => {
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
        break;
      }
      case ComponentTypes.MCQ: {
        const { options, correctIndex } = mcqState;
        component["correctIndex"] = correctIndex;
        component["options"] = options;
        break;
      }
    }

    dispatch(ADD_COMPONENT(component));

    dispatch(categorizeActions.RESET());
    dispatch(mcqActions.RESET());
    dispatch(questionActions.RESET());
  };

  return { addQuestion };
};

export default useQuestion;
