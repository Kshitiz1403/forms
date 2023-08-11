import { Router } from 'express';
import { FormController } from '../controllers/formController';
import Container from 'typedi';

const route = Router();

export default (app: Router) => {
  const ctrl: FormController = Container.get(FormController);

  app.use('/forms', route);

  route.get('/preview/', ctrl.previewForm);

  route.get('/', ctrl.getForm);

  route.post('/', ctrl.createForm);

  route.post('/question/', ctrl.addQuestion);

  route.post('/publish/', ctrl.publishForm);

  route.post('/unpublish/', ctrl.unpublishForm);
};
