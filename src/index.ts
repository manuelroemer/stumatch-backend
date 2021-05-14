import express from 'express';
import { json } from 'body-parser';
import { config } from './config';
import { establishDbConnection } from './db/connection';
import { logger } from './log';
import posts from './routes/posts';

const app = express();
app.use(json());
app.use(posts);

establishDbConnection().then(() => {
  app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}.`);
  });
});
