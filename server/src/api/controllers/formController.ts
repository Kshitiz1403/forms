import { IFormInputDTO } from '@/interfaces/IForm';
import { FormService } from '@/services/formService';
import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { Result } from '../util/result';
import { Logger } from 'winston';
import { ComponentTypes } from '@/enums/ComponentTypes';

@Service()
export class FormController {
  protected formServiceInstance: FormService;
  protected logger: Logger;
  constructor(@Inject('logger') logger: Logger, formService: FormService) {
    this.logger = logger;
    this.formServiceInstance = formService;
  }

  public previewForm = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Preview Form endpoint with %o', { params: req.params });

    try {
      const formId = req.params['formId'];
      const form = await this.formServiceInstance.previewForm(formId);
      return res.status(200).json(Result.success(form));
    } catch (error) {
      return next(error);
    }
  };

  public getForm = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Get Form endpoint with %o', { params: req.params });

    try {
      const formId = req.params['formId'];
      const form = await this.formServiceInstance.getForm(formId);
      return res.status(200).json(Result.success(form));
    } catch (error) {
      return next(error);
    }
  };
  public createForm = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Create Form endpoint with %o', { body: req.body, params: req.params });

    try {
      const form = await this.formServiceInstance.createForm();
      return res.status(200).json(Result.success(form));
    } catch (error) {
      return next(error);
    }
  };

  public addQuestion = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Add Question endpoint with %o', { body: req.body, params: req.params });
    try {
      const formId = req.params['formId'];
      const type = req.body.type as ComponentTypes;
      const payload = { ...req.body, type: undefined };
      const question = await this.formServiceInstance.addQuestion(formId, type, payload);
      return res.status(200).json(Result.success(question));
    } catch (error) {
      return next(error);
    }
  };

  public publishForm = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Publish Form endpoint with %o', { body: req.body, params: req.params });
    try {
      const formId = req.params['formId'];

      const form = await this.formServiceInstance.publishForm(formId);
      return res.status(200).json(Result.success(form));
    } catch (error) {
      return next(error);
    }
  };

  public unpublishForm = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Unpublish Form endpoint with %o', { body: req.body, params: req.params });
    try {
      const formId = req.params['formId'];

      const form = await this.formServiceInstance.unpublishForm(formId);
      return res.status(200).json(Result.success(form));
    } catch (error) {
      return next(error);
    }
  };
}
