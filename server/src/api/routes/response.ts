import { Router } from 'express';
import { RespondController } from '../controllers/respondController';
import Container from 'typedi';

const route = Router();
export default (app: Router) => {
  const ctrl: RespondController = Container.get(RespondController);

  app.use('/respond', route);

  route.post('/', ctrl.createResponse);
};
