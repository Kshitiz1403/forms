import { IForm, IFormInputDTO } from '@/interfaces/IForm';
import FormModel from '@/models/form';
import { Service } from 'typedi';

@Service()
export class FormRepository {
  public createForm = async (): Promise<IForm> => {
    try {
      const form = await FormModel.create({});
      if (form) return form.toObject();
      return null;
    } catch (error) {
      throw error;
    }
  };

  public createQuestion = async (formId: IForm['_id'], { payload, type }) => {
    return FormModel.findOneAndUpdate(
      { _id: formId },
      { $push: { components: { ...payload, type } } },
      { new: true },
    ).lean();
  };

  public publishForm = async (formId: IForm['_id']) => {
    return FormModel.findOneAndUpdate({ _id: formId }, { isLive: true }, { new: true }).lean();
  };
}
