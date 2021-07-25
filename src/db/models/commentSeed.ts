import range from 'lodash/range';
import faker from 'faker';
import { Comment } from './comment';
import { random } from 'lodash';

export const commentSeed: Array<Comment> = range(3000).map((i) => ({
  id: `10000000-0000-1000-8000-${i.toString().padStart(12, '0')}`,
  content: faker.lorem.sentences(random(2, 12)),
  authorId: `00000000-0000-1000-8000-00000000000${faker.datatype.number(8).toString()}`,
  postId: `10000000-0000-1000-8000-${faker.datatype.number(100).toString().padStart(12, '0')}`,
  createdOn: faker.date.past(),
}));
