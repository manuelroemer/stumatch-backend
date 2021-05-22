import { RequestHandler, Router } from 'express';

const get: RequestHandler = (_req, res) => res.sendStatus(200);

export default Router().get('/status', get);
