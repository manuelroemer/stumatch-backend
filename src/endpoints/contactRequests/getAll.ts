import { ContactRequest, ContactRequestModel } from '../../db/models/contactRequest';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { Router } from 'express';
import { paginationApiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';

const sortableFields: Array<SortableFields<ContactRequest>> = ['createdOn', 'modifiedOn'];

const handler = asyncRequestHandler(async (req, res) => {
  validateThisUserHasSomeRole(req, 'admin');
  const sort = getSortQueryFromUrl(req, sortableFields);
  const filter = req.query.filter?.toString();
  const query = filter ? { status: filter as any } : undefined;
  const paginationResult = await ContactRequestModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((contactRequest) => contactRequest.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/contactRequests', authenticateJwt, handler);
