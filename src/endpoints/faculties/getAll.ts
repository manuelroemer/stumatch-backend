import { Router } from 'express';
import { Faculty, FacultyModel } from '../../db/models/faculty';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

// 1) Stuff von DB holen
// 2) Mongoose Models in API Format umwandeln
// 3) Als 200 - OK JSON Array zurückgeben (-> apiResult format)

const handler = asyncRequestHandler(async (req, res) => {
  const queryResult = await FacultyModel.find();
  const result = queryResult.map((doc) => doc.toObject());
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/faculties', authenticateJwt, handler);
