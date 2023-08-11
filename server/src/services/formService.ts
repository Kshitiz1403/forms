import { ComponentTypes } from '@/enums/ComponentTypes';
import { ICategories } from '@/interfaces/Components/ICategorize';
import { createQuestionTypeHelper } from '@/interfaces/Components/ICreateQuestionEvent';
import { IMcq } from '@/interfaces/Components/IMcq';
import { IForm } from '@/interfaces/IForm';
import { FormRepository } from '@/repositories/formRepository';
import { Service } from 'typedi';

@Service()
export class FormService {
  protected formRepositoryInstance: FormRepository;
  constructor(formRepository: FormRepository) {
    this.formRepositoryInstance = formRepository;
  }

  public previewForm = async (formId: IForm['_id']) => {
    try {
      const formRecord = await this.formRepositoryInstance.getFormById(formId);
      const form = { ...formRecord };

      const components = form.components.map(component => {
        switch (component.type) {
          case ComponentTypes.CATEGORIZE: {
            const { categories, question, type, _id, correctAnswers } = component;
            const items = Object.keys(correctAnswers);
            return { _id, type, question, categories, items };
          }
          case ComponentTypes.MCQ: {
            const { question, _id, options, type } = component;
            return { _id, type, question, options };
          }
          case ComponentTypes.BOOLEAN:
          case ComponentTypes.ESSAY:
          case ComponentTypes.SHORT_ANSWER:
            const { question, _id, type } = component;
            return { _id, type, question };
        }
      });

      form.components = components;
      form.createdAt = undefined;
      form.updatedAt = undefined;
      form.__v = undefined;
      return form;
    } catch (error) {
      throw error;
    }
  };
  
  public getForm = async (formId: IForm['_id']) => {
    const form = await this.previewForm(formId);
    if (!form.isLive) throw 'The form is not live yet.';
    return form;
  };

  public createForm = async () => {
    try {
      const formRecord = await this.formRepositoryInstance.createForm();
      const form = { ...formRecord };
      form.createdAt = undefined;
      form.updatedAt = undefined;
      form.__v = undefined;
      return form;
    } catch (error) {
      throw error;
    }
  };

  public addQuestion = async (formId: IForm['_id'], type: ComponentTypes, payload) => {
    let questionTitle = payload.question;
    if (!questionTitle) throw new Error("The question can't be empty");

    let question;
    switch (type) {
      case ComponentTypes.BOOLEAN:
        let isCorrectAnswer = payload.isCorrectAnswer;
        if (isCorrectAnswer == undefined) throw new Error('You need to supply the correct answer for the question');

        question = createQuestionTypeHelper(type, { isCorrectAnswer: true, question: questionTitle });
        break;

      case ComponentTypes.CATEGORIZE:
        let categories: ICategories['categories'] = payload.categories;
        if (!Array.isArray(categories)) throw new Error('Validation Error');
        let correctAnswers: ICategories['correctAnswers'] = payload.correctAnswers;
        if (!correctAnswers) throw new Error('You must supply correct answers as well.');
        const cats = new Set<String>(categories);
        for (const key in correctAnswers) {
          const value = correctAnswers[key];
          if (!cats.has(value)) throw new Error('The correct answer must exist in the categories.');
        }
        question = createQuestionTypeHelper(type, { categories, correctAnswers, question: questionTitle });
        break;

      case ComponentTypes.MCQ:
        let correctIndex: IMcq['correctIndex'] = payload.correctIndex;
        let options: IMcq['options'] = payload.options;
        if (!Array.isArray(options)) throw new Error('Please supply the options.');
        if (correctIndex < 0 || correctIndex >= options.length || !Number.isInteger(correctIndex))
          throw new Error('Error in chosing the correct answer');
        question = createQuestionTypeHelper(type, { question: questionTitle, correctIndex, options });
        break;

      case ComponentTypes.SHORT_ANSWER:
      case ComponentTypes.ESSAY:
        question = createQuestionTypeHelper(type, { question: questionTitle });
        break;
      default:
        throw new Error('Invalid question type chosen');
    }
    await this.formRepositoryInstance.createQuestion(formId, question);
  };

  public publishForm = async (formId: IForm['_id']) => {
    const formRecord = await this.formRepositoryInstance.publishForm(formId);
    const form = { ...formRecord };
    form.createdAt = undefined;
    form.updatedAt = undefined;
    return form;
  };

  public unpublishForm = async (formId: IForm['_id']) => {
    const formRecord = await this.formRepositoryInstance.unpublishForm(formId);
    const form = { ...formRecord };
    form.createdAt = undefined;
    form.updatedAt = undefined;
    return form;
  };
}
