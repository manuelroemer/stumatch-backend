import { hashSync } from 'bcrypt';
import { User } from './user';

export const userSeed: Array<User> = [
  {
    id: '00000000-0000-1000-8000-000000000000',
    email: 'admin@stumatch',
    passwordHash: hashSync('Admin123', 8),
    displayName: 'sTUMatch Administrator',
  },
];
