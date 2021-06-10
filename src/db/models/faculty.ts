import { model } from 'mongoose';
import { v4 } from 'uuid';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Faculty extends DbObject {
  name: string;
  studyPrograms: Array<{
    _id: string;
    name: string;
  }>;
}

const facultySchema = createDbObjectSchema<Faculty>({
  name: {
    type: String,
    required: true,
  },
  studyPrograms: {
    type: [
      {
        _id: {
          type: String,
          required: true,
          default: v4(),
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const FacultyModel = model<Faculty>('Faculty', facultySchema);
