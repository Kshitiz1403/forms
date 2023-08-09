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

export const createQuestionTypeHelper = <Type extends ICreateQuestionEvent['type']>(
  ...args: Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer categories }
    ? [type: Type, payload: categories]
    : Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer mcq }
    ? [type: Type, payload: mcq]
    : Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer booleanquestion }
    ? [type: Type, payload: booleanquestion]
    : Extract<ICreateQuestionEvent, { type: Type }> extends { payload: infer comprehension }
    ? [type: Type, payload: comprehension]
    : never
) => {
  const type = args[0];
  const payload = args[1];
  return { type, payload };
};
