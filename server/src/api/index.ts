import { Router } from 'express';
import form from './routes/form';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  form(app);

  return app;
};
