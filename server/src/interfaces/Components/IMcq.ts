import { IQuestion } from "./IQuestion";

export interface IMcq extends IQuestion {
    options: string[];
    correctIndex: number;
  }