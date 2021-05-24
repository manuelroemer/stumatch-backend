import { Router } from 'express';
import { Post, PostModel } from '../../db/models/post';
import { paginationApiResult } from '../../dtos/apiResult';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { AllowedSortQueryFieldName } from '../../utils/parseMongooseSortQuery';
import { getMongooseSortQuery, getPaginationOptions } from '../../utils/requestHelpers';

const allowedSortings: Array<AllowedSortQueryFieldName<Post>> = ['id', 'createdOn', 'modifiedOn', 'content'];

const getAll = asyncRequestHandler(async (req, res) => {
  const sort = getMongooseSortQuery(req, allowedSortings);
  const paginationResult = await PostModel.paginate(getPaginationOptions(req), {}, undefined, { sort });
  const result = paginationResult.docs.map((doc) => doc.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/posts', authenticateJwt, getAll);
