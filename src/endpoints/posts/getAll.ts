import { Router } from 'express';
import { Post, PostModel } from '../../db/models/post';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { AllowedSortQueryFieldName } from '../../utils/parseMongooseSortQuery';
import { getMongooseSortQuery, getPaginationOptions } from '../../utils/requestHelpers';

const allowedSortings: Array<AllowedSortQueryFieldName<Post>> = ['id', 'createdOn', 'modifiedOn', 'content'];

const getAll = asyncRequestHandler(async (req, res) => {
  const sort = getMongooseSortQuery(req, allowedSortings);
  const queryResult = await PostModel.paginate(getPaginationOptions(req), {}, undefined, { sort });
  return res.status(200).apiResult({ ...queryResult, result: queryResult.result.map((post) => post.toObject()) });
});

export default Router().get('/api/v1/posts', authenticateJwt, getAll);
