import { SchemaOf, object, string, number } from 'yup';
import { FacultyModel } from '../db/models/faculty';

export interface MatchRequestBody {
  id?: string;
  facultyId?: string;
  studyProgramId?: string;
  minSemester?: number;
  maxSemester?: number;
}

export const matchRequestSchema: SchemaOf<MatchRequestBody> = object({
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
