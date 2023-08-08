import { IQuestion } from './IQuestion';

export interface ICategories extends IQuestion {
  categories: string[];
  correctAnswers: Record<string, string>;
}
