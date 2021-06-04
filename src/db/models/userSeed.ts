import { hashSync } from 'bcrypt';
import { User } from './user';
import range from 'lodash/range';
import faker from 'faker';

export const userSeed: Array<User> = [
  {
    id: '00000000-0000-1000-8000-000000000000',
    email: 'admin@stumatch',
    passwordHash: hashSync('Admin123', 8),
    displayName: 'sTUMatch Administrator',
    roles: ['student', 'admin'],
  },
  {
    id: '00000000-0000-1000-8000-000000000001',
    email: 'student@stumatch',
    passwordHash: hashSync('Student123', 8),
    displayName: 'sTUMatch User',
    roles: ['student', 'globalContentManager'],
  },
  ...range(10).map((i) => {
    const user: User = {
      id: `00000000-0000-2000-8000-${i.toString().padStart(12, '0')}`,
      email: faker.internet.email(),
      passwordHash: hashSync('Student123', 8),
      displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      roles: ['student'],
    };
    return user;
  }),
];
