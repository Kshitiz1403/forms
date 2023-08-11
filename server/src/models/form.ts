import { IForm } from '@/interfaces/IForm';
import mongoose, { Schema } from 'mongoose';

const componentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    unique: true,
  },
  imageURL: {
    type: Schema.Types.String,
  },
  question: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },

  //   boolean type
  isCorrectAnswer: {
    type: Schema.Types.Boolean,
  },

  //categories type
  categories: {
    type: [Schema.Types.String],
    default: undefined,
  },
  correctAnswers: {
    type: Schema.Types.Mixed,
  },

  //mcq type
  options: {
    type: [Schema.Types.String],
    default: undefined,
  },
  correctIndex: {
    type: Schema.Types.Number,
  },
});

const Form = new Schema<IForm>(
  {
    isLive: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: Schema.Types.String,
    },
    components: [componentSchema],
  },
  { timestamps: true },
);

export default mongoose.model<IForm>('Form', Form);
