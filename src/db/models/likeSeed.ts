import range from 'lodash/range';
import { Like } from './like';
import faker from 'faker';

export const likeSeed: Array<Like> = range(3000).map((i) => ({
  id: `10000000-0000-1000-8000-${i.toString().padStart(12, '0')}`,
  userId: `00000000-0000-1000-8000-00000000000${faker.datatype.number(8).toString()}`,
  postId: `10000000-0000-1000-8000-${faker.datatype.number(100).toString().padStart(12, '0')}`,
}));
