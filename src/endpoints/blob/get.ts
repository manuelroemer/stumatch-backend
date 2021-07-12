import { Router } from 'express';
import { BlobModel } from '../../db/models/blob';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const blob = await BlobModel.findById(id);

  if (!blob) {
    res.sendStatus(404);
    return;
  }

  return res.status(200).send(blob.data);
});

export default Router().get('/api/v1/blob/:id', handler);
