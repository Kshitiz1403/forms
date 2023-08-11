import { Router } from 'express';
import { FormController } from '../controllers/formController';
import Container from 'typedi';

const route = Router();

export default (app: Router) => {
  const ctrl: FormController = Container.get(FormController);

  app.use('/forms', route);

  route.get('/:formId', ctrl.getForm);

  route.post('/', ctrl.createForm);

  route.post('/question/:formId', ctrl.addQuestion);

  route.post('/publish/:formId', ctrl.publishForm);

  route.post('/unpublish/:formId', ctrl.unpublishForm);
};
