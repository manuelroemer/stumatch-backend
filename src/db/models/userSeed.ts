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
    id: '00000000-0000-1000-8000-000000000004',
    email: 'student2@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Student2',
    facultyId: '20000000-0000-1000-8000-000000000000',
    roles: ['student'],
  },
  {
    id: '00000000-0000-1000-8000-000000000005',
    email: 'student3@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Student3',
    facultyId: '20000000-0000-1000-8000-000000000000',
    studyProgramId: '20000000-0000-1000-8000-000000000014',
    roles: ['student'],
  },
  {
    id: '00000000-0000-1000-8000-000000000006',
    email: 'student4@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Student4',
    facultyId: '20000000-0000-1000-8000-000000000000',
    studyProgramId: '20000000-0000-1000-8000-000000000016',
    roles: ['student'],
  },
  {
    id: '00000000-0000-1000-8000-000000000007',
    email: 'student5@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Student5',
    facultyId: '20000000-0000-1000-8000-000000000001',
    roles: ['student'],
  },
  {
    id: '00000000-0000-1000-8000-000000000008',
    email: 'student6@stumatch',
    passwordHash: hashSync('Student123', 8),
    firstName: 'sTUMatch',
    lastName: 'Student6',
    facultyId: '20000000-0000-1000-8000-000000000001',
    studyProgramId: '20000000-0000-1000-8000-000000000027',
    roles: ['student'],
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
