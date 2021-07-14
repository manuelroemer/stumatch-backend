import { Router } from 'express';
import { number, object, SchemaOf, string } from 'yup';
import { FacultyModel } from '../../db/models/faculty';
import { MatchRequestModel } from '../../db/models/matchRequest';
import { apiResult } from '../../dtos/apiResults';
import { findMatchingMatchRequest } from '../../endpointHelpers/matcher';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';

interface MatchRequestBody {
  id?: string;
  facultyId?: string;
  studyProgramId?: string;
  minSemester?: number;
  maxSemester?: number;
}

const schema: SchemaOf<MatchRequestBody> = object({
  id: string().uuid(),
  facultyId: string()
    .uuid()
    .test('checkExists', 'Checks that faculty exists.', async (value) => {
      if (!value) {
        return true;
      }
      return !!(await FacultyModel.findById(value));
    }),
  studyProgramId: string()
    .uuid()
    .test('checkExistsStudyProgram', 'Checks that study program exists.', async (value) => {
      if (!value) {
        return true;
      }
      const faculties = await FacultyModel.find();
      const studyPrograms = faculties.flatMap((f) => f.studyPrograms);
      return !!studyPrograms.find((f) => f._id === value);
    }),
  minSemester: number(),
  maxSemester: number(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as MatchRequestBody;
  const user = getUserOrThrow(req);
  const matchRequest = new MatchRequestModel({ _id: body.id, userId: user.id, ...body });
  await matchRequest.save();

  findMatchingMatchRequest(matchRequest);
  return res.status(201).json(apiResult(matchRequest.toObject()));
});

export default Router().post('/api/v1/matchRequests', authenticateJwt, validateRequestBody(schema), handler);
