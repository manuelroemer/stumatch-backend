import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { PostRequestBody, postValidationSchema } from '../../endpointHelpers/post';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';
import { getUserOrThrow } from '../../utils/requestHelpers';
import { createBlobFromString } from '../../endpointHelpers/blob';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  validateThisUserHasSomeRole(req, ['admin', 'globalContentManager']);
  const body = req.body as PostRequestBody;
  console.log('BODY');
  console.log(body);
  const postImageBlob = body.postImageBlob ? await createBlobFromString(body.postImageBlob, 'base64') : undefined;
  const post = new PostModel({
    _id: body.id,
    authorId: user.id,
    content: body.content,
    title: body.title,
    category: body.category,
    postImageBlobId: postImageBlob?.id,
  });
  await post.save();
  console.log(post);
  return res.status(201).json(apiResult(post.toObject()));
});

export default Router().post('/api/v1/posts', authenticateJwt, validateRequestBody(postValidationSchema), handler);
