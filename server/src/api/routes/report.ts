import { Router } from 'express';
import Container from 'typedi';
import { ReportController } from '../controllers/reportController';

const route = Router();
export default (app: Router) => {
  const ctrl: ReportController = Container.get(ReportController);

  app.use('/report', route);

  route.get('/', ctrl.getReport);
};
