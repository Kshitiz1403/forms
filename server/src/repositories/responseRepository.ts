import { IResponse } from '@/interfaces/IResponse';
import ResponseModel from '@/models/response';
import { Service } from 'typedi';

@Service()
export class ResponseRepository {
    
  public createResponse = async (formId: IResponse['formId'], responses: IResponse['responses']) => {
    return (await ResponseModel.create({ formId, responses })).toObject();
  };
}
