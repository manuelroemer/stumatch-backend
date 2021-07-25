import { Router } from 'express';
import { AdvertisementModel } from '../../db/models/advertisement';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';
import { getEnrichedAdvertisementDto } from '../../endpointHelpers/advertisement';

const handler = asyncRequestHandler(async (req, res) => {
  const now = new Date();
  const user = getUserOrThrow(req);

  const query = {
    status: 'verified',
    startDate: { $lte: now },
    endDate: { $gte: now },
    $or: [
      { $and: [{ $or: [{ facultyId: user.facultyId }, { facultyId: null }] }, { studyProgramId: null }] },
      { $and: [{ studyProgramId: user.studyProgramId }, { studyProgramId: { $ne: null } }] },
    ],
  };

  const aggregationResult = await AdvertisementModel.aggregate().match(query).sample(1);
  if (aggregationResult.length == 0) {
    throw new NotFoundError();
  }
  return res.status(200).json(apiResult(await getEnrichedAdvertisementDto(aggregationResult[0])));
/*   const results = await Promise.all(
    aggregationResult.map((advertisement) => getEnrichedAdvertisementDto(advertisement)),
  );
  return res.status(200).json(apiResult(results)); */
});

export default Router().get('/api/v1/feedAdvertisements/random', authenticateJwt, handler);
