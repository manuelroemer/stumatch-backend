import { Router } from 'express';
import { Post, PostModel } from '../../db/models/post';
import { UserModel } from '../../db/models/user';
import { paginationApiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getSortQueryFromUrl, getPaginationOptions } from '../../utils/requestHelpers';

const sortableFields: Array<SortableFields<Post>> = ['id', 'createdOn', 'modifiedOn', 'content'];

const handler = asyncRequestHandler(async (req, res) => {
  const sort = getSortQueryFromUrl(req, sortableFields);
  const paginationResult = await PostModel.paginate(getPaginationOptions(req), {}, undefined, { sort });
  const result = paginationResult.docs.map((doc) => doc.toObject());
  const apiResults = await Promise.all(
    result.map(async (post) => {
      const author = await UserModel.findById(post.authorId);

      return {
        ...post,
        author,
        likes: 100,
        comments: 100,
      };
    }),
  );

  return res.status(200).json(paginationApiResult(apiResults, paginationResult));
});

export default Router().get('/api/v1/posts', authenticateJwt, handler);
