import { Types } from 'mongoose';
import { IUser } from './IUser';
import { IComponent } from './IComponent';

export interface IForm {
  _id: Types.ObjectId;
  createdBy: IUser['_id'];
  components: IComponent[];
}
