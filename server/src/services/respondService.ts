import { IResponse } from '@/interfaces/IResponse';
import { FormRepository } from '@/repositories/formRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { Service } from 'typedi';

@Service()
export class RespondService {
  protected respondRepositoryInstance: ResponseRepository;
  protected formRepositoryInstance: FormRepository;
  constructor(respondRepository: ResponseRepository, formRepository: FormRepository) {
    this.respondRepositoryInstance = respondRepository;
    this.formRepositoryInstance = formRepository;
  }

  public createResponse = async (formId: IResponse['formId'], responses: IResponse['responses']) => {
    const isLive = await this.formRepositoryInstance.isFormLive(formId);
    if (!isLive) throw new Error('The form is not live yet.');
    const responseRecord = await this.respondRepositoryInstance.createResponse(formId, responses);
    const response = { ...responseRecord };
    response.createdAt = undefined;
    response.updatedAt = undefined;
    return response;
  };
}
