import { Router } from 'express';
import { number, object, SchemaOf, string, boolean } from 'yup';
import { FacultyModel } from '../../db/models/faculty';
import { UserModel } from '../../db/models/user';
import { apiResult } from '../../dtos/apiResults';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { NotFoundError } from '../../dtos/apiErrors';
import { getUserId } from '../../utils/requestHelpers';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { emailRegex } from '../../constants';
import { MatchRequestModel } from '../../db/models/matchRequest';
import { findMatchingMatchRequest } from '../../endpointHelpers/matcher';
interface UserBody {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  facultyId?: string;
  studyProgramId?: string;
  searchForJobs?: boolean;
  immatriculatedOn?: {
    startingSemester?: string;
    startingYear?: number;
  };
}

const schema: SchemaOf<UserBody> = object({
  id: string().uuid(),
  email: string().required().matches(emailRegex).max(320),
  firstName: string().required(),
  lastName: string().required(),
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
  searchForJobs: boolean().oneOf([true, false]),
  immatriculatedOn: object().shape({
    startingSemester: string().oneOf(['WS', 'SS']),
    startingYear: number()
      .min(1900)
      .max(new Date().getFullYear() + 2),
  }),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as UserBody;
  const id = getUserId(req);
  const user = await UserModel.findById(id);
  if (!user) {
    throw new NotFoundError();
  }

  user.email = body.email!;
  user.firstName = body.firstName!;
  user.lastName = body.lastName!;
  user.facultyId = body.facultyId;
  user.studyProgramId = body.studyProgramId;
  user.startingSemester = body.immatriculatedOn?.startingSemester as any;
  user.startingYear = body.immatriculatedOn?.startingYear;
  user.searchForJobs = body.searchForJobs;

  await user.save();

  const pendingMatchRequests = await MatchRequestModel.find(
    {
      userId: { $ne: user.id },
      matchResultId: { $exists: false },
      isDeleted: false,
    },
    undefined,
    { sort: { createdOn: 'asc' } },
  );

  if (!pendingMatchRequests) {
    throw new NotFoundError();
  }
  for (const matchRequest of pendingMatchRequests) {
    findMatchingMatchRequest(matchRequest);
  }

  return res.status(200).json(apiResult(user.toObject()));
});

export default Router().put('/api/v1/users/:id', authenticateJwt, validateRequestBody(schema), handler);
