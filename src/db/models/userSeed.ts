import { hashSync } from 'bcrypt';
import { User } from './user';

export const userSeed: Array<User> = [
  {
    id: '000000000000',
    email: 'admin@stumatch',
    passwordHash: hashSync('Admin123', 8),
  },
];
