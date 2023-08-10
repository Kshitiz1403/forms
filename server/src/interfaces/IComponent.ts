import { ObjectId } from 'mongoose';
import { Component } from './Components';

export type IComponent = {
  _id: ObjectId;
  imageURL?: string;
  question: string;
  type: Component;
  isCorrectAnswer?: boolean;
  categories?: string[];
  correctAnswers?: Record<string, string>;
  options?: string[];
  correctIndex?: number;
};
