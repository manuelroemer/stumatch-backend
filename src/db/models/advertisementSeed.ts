import { Advertisement } from './advertisement';
import faker from 'faker';

export const advertisementSeed: Array<Advertisement> = [
  {
    id: '40000000-0000-1000-8000-000000000001',
    authorId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    shortDescription: faker.lorem.sentence(10),
    content: faker.lorem.sentence(20),
    facultyId: '20000000-0000-1000-8000-000000000000',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-07-20T14:15:29.307+00:00'),
    status: 'unverified',
  },
  {
    id: '40000000-0000-1000-8000-000000000002',
    authorId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    shortDescription: faker.lorem.sentence(10),
    content: faker.lorem.sentence(20),
    facultyId: '20000000-0000-1000-8000-000000000000',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-07-20T14:15:29.307+00:00'),
    status: 'pendingVerification',
  },
  {
    id: '40000000-0000-1000-8000-000000000003',
    authorId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    shortDescription: faker.lorem.sentence(10),
    content: faker.lorem.sentence(20),
    facultyId: '20000000-0000-1000-8000-000000000001',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-07-20T14:15:29.307+00:00'),
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000004',
    authorId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    shortDescription: faker.lorem.sentence(10),
    content: faker.lorem.sentence(20),
    facultyId: '20000000-0000-1000-8000-000000000001',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-07-20T14:15:29.307+00:00'),
    status: 'denied',
  },
];
