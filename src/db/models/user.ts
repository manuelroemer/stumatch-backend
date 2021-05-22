import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface User extends DbObject {
  passwordHash: string;
  email: string;
  displayName: string;
}

const userSchema = createDbObjectSchema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const UserModel = model<User>('User', userSchema);
