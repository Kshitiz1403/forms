import { Types } from 'mongoose';
import { IUser } from './IUser';
import { IComponent } from './IComponent';

export interface IForm {
  _id: Types.ObjectId;
  imageURL?: string;
  isLive: boolean;
  // createdBy: IUser['_id'];
  components: IComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export type IFormInputDTO = Omit<IForm, '_id' | 'createdAt' | 'updatedAt'>;
