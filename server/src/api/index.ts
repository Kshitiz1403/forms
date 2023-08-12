import { Router } from 'express';
import form from './routes/form';
import response from './routes/response';
import report from './routes/report';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  form(app);
  response(app);
  report(app);

  return app;
};
