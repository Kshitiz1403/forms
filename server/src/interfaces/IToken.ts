import { Types } from 'mongoose';
import { IUser } from './IUser';

export interface IToken {
  userId: IUser['_id'];
  iat: Number;
  exp: Number;
}
