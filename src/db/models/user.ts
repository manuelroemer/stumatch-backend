import { model, Schema } from 'mongoose';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
}

const UserSchema = new Schema<User>({
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

export const UserModel = model<User>('User', UserSchema);
