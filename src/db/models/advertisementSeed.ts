import { Advertisement } from './advertisement';
import faker from 'faker';

export const advertisementSeed: Array<Advertisement> = [
  {
    id: '40000000-0000-1000-8000-000000000001',
    userId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    content: faker.lorem.sentence(20),
    status: 'unverified',
  },
  {
    id: '40000000-0000-1000-8000-000000000002',
    userId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    content: faker.lorem.sentence(20),
    status: 'pendingVerification',
  },
  {
    id: '40000000-0000-1000-8000-000000000003',
    userId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    content: faker.lorem.sentence(20),
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000004',
    userId: '00000000-0000-1000-8000-000000000003',
    title: faker.lorem.sentence(5),
    content: faker.lorem.sentence(20),
    status: 'denied',
  },
];
