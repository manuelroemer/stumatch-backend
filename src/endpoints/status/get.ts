import { RequestHandler, Router } from 'express';

const handler: RequestHandler = (_req, res) => res.sendStatus(200);

export default Router().get('/status', handler);
