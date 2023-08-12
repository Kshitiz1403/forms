import { ComponentTypes } from '@/enums/ComponentTypes';
import { IForm } from '@/interfaces/IForm';
import { IResponse } from '@/interfaces/IResponse';
import { FormRepository } from '@/repositories/formRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { Service } from 'typedi';
import _isEqual from 'lodash.isequal';

@Service()
export class ReportService {
  protected respondRepositoryInstance: ResponseRepository;
  protected formRepositoryInstance: FormRepository;

  constructor(respondRepository: ResponseRepository, formRepository: FormRepository) {
    this.respondRepositoryInstance = respondRepository;
    this.formRepositoryInstance = formRepository;
  }

  public getReport = async (responseId: IResponse['_id']) => {
    const responseRecord = await this.respondRepositoryInstance.getResponseById(responseId);
    const formRecord = await this.formRepositoryInstance.getFormById(responseRecord.formId);
    const expectedAnswersMap = new Map<IForm['components'][0]['_id'], IForm['components'][0]>();
    const userAnswersMap = new Map<IResponse['responses'][0]['questionId'], IResponse['responses'][0]>();
    responseRecord.responses.map(response => {
      const questionId = response.questionId;
      userAnswersMap.set(questionId.toString(), response);
    });
    formRecord.components.map(component => {
      const questionId = component._id;
      expectedAnswersMap.set(questionId.toString(), component);
    });

    const questionCorrectnessStatus = [];

    for (const [questionId, value] of userAnswersMap) {
      switch (value.type) {
        case ComponentTypes.CATEGORIZE: {
          const userCategoryAnswer = value.chosenAnswers;
          const expectedCategoryAnswers = expectedAnswersMap.get(questionId).correctAnswers;
          if (_isEqual(userCategoryAnswer, expectedCategoryAnswers)) {
            questionCorrectnessStatus.push({
              questionId,
              status: true,
              expected: userCategoryAnswer,
              got: userCategoryAnswer,
            });
          } else {
            questionCorrectnessStatus.push({
              questionId,
              status: false,
              expected: expectedCategoryAnswers,
              got: userCategoryAnswer,
            });
          }
          break;
        }
        case ComponentTypes.MCQ: {
          const userChosenIndex = value.chosenIndex;
          const expectedMCQIndex = expectedAnswersMap.get(questionId).correctIndex;
          if (_isEqual(userChosenIndex, expectedMCQIndex)) {
            questionCorrectnessStatus.push({
              questionId,
              status: true,
              expected: userChosenIndex,
              got: userChosenIndex,
            });
          } else {
            questionCorrectnessStatus.push({
              questionId,
              status: false,
              expected: expectedMCQIndex,
              got: userChosenIndex,
            });
          }
          break;
        }
        case ComponentTypes.SHORT_ANSWER:
        case ComponentTypes.ESSAY: {
          const userChosenResponse = value.textResponse;
          questionCorrectnessStatus.push({ questionId, status: true, expected: null, got: userChosenResponse });
        }
      }
    }

    const report = questionCorrectnessStatus.map(questionCorrectness => {
      const { questionId, status, expected, got } = questionCorrectness;
      const expectedAnswer = expectedAnswersMap.get(questionId);
      const { question, type } = expectedAnswer;
      return { ...questionCorrectness, question, type };
    });

    return report;
  };
}
