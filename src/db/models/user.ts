import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export const knownUserRoles = ['user', 'admin'] as const;
export type UserRole = typeof knownUserRoles[number];

export interface User extends DbObject {
  passwordHash: string;
  email: string;
  displayName: string;
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
  displayName: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ['user'],
  },
});

export const UserModel = model<User>('User', userSchema);
