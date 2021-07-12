import { Post } from './post';
import range from 'lodash/range';
import faker from 'faker';

export const postSeed: Array<Post> = range(100).map((i) => ({
  id: `10000000-0000-1000-8000-${i.toString().padStart(12, '0')}`,
  content: faker.lorem.sentences(100),
  title: faker.lorem.sentence(10),
  authorId: '00000000-0000-1000-8000-000000000000',
  category: faker.random.word(),
  createdOn: faker.date.past(),
}));
