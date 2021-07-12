import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export const knownUserRoles = ['student', 'admin', 'advertiser', 'globalContentManager'] as const;
export type UserRole = typeof knownUserRoles[number];

export interface User extends DbObject {
  passwordHash: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageBlobId?: string;
  facultyId?: string;
  studyProgramId?: string;
  startingSemester?: 'WS' | 'SS';
  startingYear?: number;
  roles: Array<UserRole>;
}

const userSchema = createDbObjectSchema<User>({
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImageBlobId: {
    type: String,
    required: false,
  },
  facultyId: {
    type: String,
  },
  studyProgramId: {
    type: String,
  },
  startingSemester: {
    type: String,
  },
  startingYear: {
    type: Number,
  },
  roles: {
    type: [String],
    required: true,
    default: ['student'],
  },
});

export const UserModel = model<User>('User', userSchema);
