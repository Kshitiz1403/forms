import { IResponse } from '@/interfaces/IResponse';
import mongoose, { Schema, Types } from 'mongoose';

const responsesSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
  chosenAnswers: {
    type: Schema.Types.Mixed,
  },
  chosenIndex: {
    type: Schema.Types.Number,
  },
  textResponse: {
    type: Schema.Types.String,
  },
});

const Response = new Schema<IResponse>(
  {
    formId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    responses: [responsesSchema],
  },
  { timestamps: true },
);

export default mongoose.model<IResponse>('Response', Response);
