import { Router } from 'express';
import form from './routes/form';
import response from './routes/response';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  form(app);
  response(app);

  return app;
};
