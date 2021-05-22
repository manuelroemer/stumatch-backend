import { Post } from './post';
import range from 'lodash/range';
import faker from 'faker';

export const postSeed: Array<Post> = range(100).map((i) => ({
  id: `10000000-0000-1000-8000-${i.toString().padStart(12, '0')}`,
  content: faker.lorem.sentence(10),
}));
