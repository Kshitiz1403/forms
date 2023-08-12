import { ReportService } from '@/services/reportService';
import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { Result } from '../util/result';

@Service()
export class ReportController {
  protected reportServiceInstance: ReportService;
  protected logger: Logger;

  constructor(@Inject('logger') logger: Logger, reportService: ReportService) {
    this.reportServiceInstance = reportService;
    this.logger = logger;
  }

  public getReport = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Get Report Form endpoint with %o', { query: req.query });

    try {
      const reportId = req.query['id'];
      const report = await this.reportServiceInstance.getReport(reportId);
      return res.status(200).json(Result.success(report));
    } catch (error) {
      return next(error);
    }
  };
}
