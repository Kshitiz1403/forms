import { ComponentTypes } from '@/enums/ComponentTypes';

export type Component =
  | ComponentTypes.BOOLEAN
  | ComponentTypes.CATEGORIZE
  | ComponentTypes.ESSAY
  | ComponentTypes.MCQ
  | ComponentTypes.SHORT_ANSWER;
