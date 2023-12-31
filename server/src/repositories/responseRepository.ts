import { IResponse } from '@/interfaces/IResponse';
import ResponseModel from '@/models/response';
import { Service } from 'typedi';

@Service()
export class ResponseRepository {
  public getResponseById = async (responseId: IResponse['_id']) => {
    return (await ResponseModel.findById(responseId)).toObject();
  };
  public createResponse = async (formId: IResponse['formId'], responses: IResponse['responses']) => {
    return (await ResponseModel.create({ formId, responses })).toObject();
  };
}
