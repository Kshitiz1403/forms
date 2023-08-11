import { Types } from 'mongoose';
import { IForm } from './IForm';
import { Component } from './Components';

export interface IResponse {
  _id: Types.ObjectId;
  formId: IForm['_id'];
  responses: {
    _id: Types.ObjectId;
    questionId: Types.ObjectId;
    type: Component;
    chosenAnswers?: Record<string, string>;
    chosenIndex?: number;
    textResponse?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
