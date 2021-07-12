import { hashSync } from 'bcrypt';
import { User } from './user';
import range from 'lodash/range';
import faker from 'faker';

export const userSeed: Array<User> = [
  {
    id: '00000000-0000-1000-8000-000000000000',
    email: 'admin@stumatch',
    passwordHash: hashSync('Admin123', 8),
    firstName: 'sTUMatch',
    lastName: 'Administrator',
    roles: ['student', 'admin'],
  },
  {
    id: '00000000-0000-1000-8000-000000000001',
    email: 'student@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Student',
    roles: ['student'],
  },
  {
    id: '00000000-0000-1000-8000-000000000002',
    email: 'educator@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Educator',
    roles: ['student', 'globalContentManager'],
  },
  {
    id: '00000000-0000-1000-8000-000000000003',
    email: 'advertiser@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Advertiser',
    roles: ['advertiser'],
  },
  {
    id: '10000000-0000-1000-8000-000000000000',
    email: 'manu@stumatch',
    passwordHash: hashSync('Admin123', 8),
    firstName: 'Manu',
    lastName: 'Römer',
    profileImageBlobId: '10000000-0000-1000-8000-000000000000',
    roles: ['student', 'admin', 'advertiser', 'globalContentManager'],
  },
  {
    id: '10000000-0000-1000-8000-000000000001',
    email: 'nhu@stumatch',
    passwordHash: hashSync('Admin123', 8),
    firstName: 'Nhu',
    lastName: 'Duong',
    profileImageBlobId: '10000000-0000-1000-8000-000000000001',
    roles: ['student', 'admin', 'advertiser', 'globalContentManager'],
  },
  {
    id: '10000000-0000-1000-8000-000000000002',
    email: 'jonas@stumatch',
    passwordHash: hashSync('Admin123', 8),
    firstName: 'Jonas',
    lastName: 'Großmann',
    profileImageBlobId: '10000000-0000-1000-8000-000000000002',
    roles: ['student', 'admin', 'advertiser', 'globalContentManager'],
  },
  {
    id: '10000000-0000-1000-8000-000000000003',
    email: 'khang@stumatch',
    passwordHash: hashSync('Admin123', 8),
    firstName: 'Khang',
    lastName: 'Phan',
    profileImageBlobId: '10000000-0000-1000-8000-000000000003',
    roles: ['student', 'admin', 'advertiser', 'globalContentManager'],
  },
  ...range(10).map((i) => {
    const user: User = {
      id: `00000000-0000-2000-8000-${i.toString().padStart(12, '0')}`,
      email: faker.internet.email(),
      passwordHash: hashSync('Student123', 8),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      roles: ['student'],
    };
    return user;
  }),
];
