import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { establishDbConnection } from './db/connection';
import { config } from './config';
import { logger } from './log';
import { apiErrorHandler } from './middlewares/apiErrorHandler';
import { endpoints } from './endpoints/endpoints';
import './middlewares/passport';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(endpoints);
app.use(apiErrorHandler);

establishDbConnection().then(() => {
  app.listen(config.serverPort, () => {
    logger.info(`Server is running on port ${config.serverPort}.`);
  });
});
