import { Router } from 'express';
import { FacultyModel } from '../../db/models/faculty';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const queryResult = await FacultyModel.find();
  const result = queryResult.map((facultyDoc) => {
    // Reason for this (yes, it's dirty):
    // studyPrograms has the _id prop, we want 'id' for the API.
    // For our simple usecase (readonly APIs only) it's more than enough to just do a quick mapping
    // here instead of having a better DB schema.
    const faculty = facultyDoc.toObject();
    return {
      ...faculty,
      studyPrograms: faculty.studyPrograms.map((studyProgram) => ({
        id: studyProgram._id,
        name: studyProgram.name,
      })),
    };
  });
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/faculties', authenticateJwt, handler);
