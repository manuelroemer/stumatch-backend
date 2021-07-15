import { Router } from 'express';
import { Comment, CommentModel } from '../../db/models/comment';
import { paginationApiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getSortQueryFromUrl, getPaginationOptions } from '../../utils/requestHelpers';

const sortableFields: Array<SortableFields<Comment>> = ['id', 'createdOn', 'modifiedOn', 'content'];

const handler = asyncRequestHandler(async (req, res) => {
  const sort = getSortQueryFromUrl(req, sortableFields);
  const query = { postId: req.params.id };
  const paginationResult = await CommentModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((doc) => doc.toObject());

  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/posts/comments/:id', authenticateJwt, handler);
