import { Router } from 'express';
import { Post, PostModel } from '../../db/models/post';
import { paginationApiResult } from '../../dtos/apiResults';
import { getEnrichedPostDto } from '../../endpointHelpers/post';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getSortQueryFromUrl, getPaginationOptions } from '../../utils/requestHelpers';

const sortableFields: Array<SortableFields<Post>> = ['id', 'createdOn', 'modifiedOn', 'content'];

const handler = asyncRequestHandler(async (req, res) => {
  const sort = getSortQueryFromUrl(req, sortableFields);
  const filter = req.query.filter?.toString();
  const query = filter ? { category: filter } : undefined;
  const paginationResult = await PostModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((doc) => doc.toObject());
  const apiResults = await Promise.all(result.map((post) => getEnrichedPostDto(post)));

  return res.status(200).json(paginationApiResult(apiResults, paginationResult));
});

export default Router().get('/api/v1/posts', authenticateJwt, handler);
