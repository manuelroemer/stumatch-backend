import { Router } from 'express';
import { number, object, SchemaOf, string, boolean } from 'yup';
import { FacultyModel } from '../../db/models/faculty';
import { UserModel } from '../../db/models/user';
import { apiResult } from '../../dtos/apiResults';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { hash } from 'bcrypt';
import { createBlobFromString } from '../../endpointHelpers/blob';
import { emailRegex, passwordRegex } from '../../constants';

interface UserBody {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  facultyId?: string;
  studyProgramId?: string;
  immatriculatedOn?: {
    startingSemester?: string;
    startingYear?: number;
  };
  searchForJobs?: boolean;
  profileImageBlob?: string;
}

const schema: SchemaOf<UserBody> = object({
  id: string().uuid(),
  email: string().required().matches(emailRegex).max(320),
  password: string().required().matches(passwordRegex),
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
  immatriculatedOn: object().shape({
    startingSemester: string().oneOf(['WS', 'SS']),
    startingYear: number()
      .min(1900)
      .max(new Date().getFullYear() + 2),
  }),
  searchForJobs: boolean().oneOf([true, false]),
  profileImageBlob: string(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as UserBody;
  const profileImageBlob = body.profileImageBlob
    ? await createBlobFromString(body.profileImageBlob, 'base64')
    : undefined;
  const user = await UserModel.create({
    _id: body.id,
    email: body.email,
    passwordHash: await hash(body.password, 8),
    firstName: body.firstName,
    lastName: body.lastName,
    facultyId: body.facultyId,
    studyProgramId: body.studyProgramId,
    startingSemester: body.immatriculatedOn?.startingSemester,
    startingYear: body.immatriculatedOn?.startingYear,
    searchForJobs: body.searchForJobs,
    roles: ['student'],
    profileImageBlobId: profileImageBlob?.id,
  });

  return res.status(201).json(apiResult(user.toObject()));
});

export default Router().post('/api/v1/users', validateRequestBody(schema), handler);
