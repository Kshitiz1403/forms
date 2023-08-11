import { IForm, IFormInputDTO } from '@/interfaces/IForm';
import FormModel from '@/models/form';
import { Service } from 'typedi';

@Service()
export class FormRepository {
  public getFormById = async (formId: IForm['_id']) => {
    return (await FormModel.findById(formId)).toObject();
  };

  public createForm = async () => {
    return (await FormModel.create({})).toObject();
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

  public isFormLive = async (formId: IForm['_id']) => {
    return (await FormModel.findById(formId)).isLive;
  };
}
