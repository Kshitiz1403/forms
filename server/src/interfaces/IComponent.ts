import { ObjectId } from 'mongoose';
import { Component } from './Components';

export type IComponent = {
  _id: ObjectId;
  imageURL?: string;
  type: Component;
};
