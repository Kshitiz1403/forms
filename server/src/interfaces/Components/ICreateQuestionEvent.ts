import { ComponentTypes } from '@/enums/ComponentTypes';
import { ICategories } from './ICategorize';
import { IMcq } from './IMcq';
import { IBoolean } from './IBoolean';
import { IComprehension } from './IComprehension';

export type ICreateQuestionEvent =
  | {
      type: ComponentTypes.CATEGORIZE;
      payload: ICategories;
    }
  | {
      type: ComponentTypes.MCQ;
      payload: IMcq;
    }
  | {
      type: ComponentTypes.BOOLEAN;
      payload: IBoolean;
    }
  | {
      type: ComponentTypes.SHORT_ANSWER;
      payload: IComprehension;
    }
  | {
      type: ComponentTypes.ESSAY;
      payload: IComprehension;
    };

const createQuestion = <Type extends ICreateQuestionEvent['type']>(
  ...args: Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer categories }
    ? [type: Type, payload: categories]
    : Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer mcq }
    ? [type: Type, payload: mcq]
    : Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer booleanquestion }
    ? [type: Type, payload: booleanquestion]
    : Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer comprehension }
    ? [type: Type, payload: comprehension]
    : never
) => {};

createQuestion(ComponentTypes.CATEGORIZE, {
  question: 'Dsalkdjsa',
  categories: ['hello'],
  correctAnswers: { Yolo: 'hello' },
});
createQuestion(ComponentTypes.MCQ, { question: 'ADKSjasl', correctIndex: 0, options: ['Hello', 'kdljsada'] });
createQuestion(ComponentTypes.BOOLEAN, { isCorrectAnswer: false, question: 'dsadklsaj' });
createQuestion(ComponentTypes.ESSAY, { question: 'dasdSKl' });
