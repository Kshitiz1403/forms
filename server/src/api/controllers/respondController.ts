import { RespondService } from '@/services/respondService';
import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import { Logger } from 'winston';
import { Result } from '../util/result';

export class RespondController {
  protected respondService: RespondService;
  protected logger: Logger;

  constructor(@Inject('logger') logger: Logger, respondService: RespondService) {
    this.respondService = respondService;
    this.logger = logger;
  }

  public createResponse = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Create Response endpoint with %o', { body: req.body, query: req.query });

    try {
      const formId = req.query['id'];
      const responses = req.body.responses;
      const response = await this.respondService.createResponse(formId, responses);
      return res.status(200).json(Result.success(response));
    } catch (error) {
      return next(error);
    }
  };
}
