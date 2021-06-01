import { Notification } from './notification';
import faker from 'faker';
import { userSeed } from './userSeed';
import flatten from 'lodash/flatten';
import range from 'lodash/range';

export const notificationSeed: Array<Notification> = flatten(
  userSeed.map((user, userIndex) =>
    range(0, 100).map((i) => ({
      id: `20000000-${userIndex.toString().padStart(4, '0')}-1000-8000-${i.toString().padStart(12, '0')}`,
      type: 'text',
      userId: user.id!,
      seen: faker.random.arrayElement([true, false, undefined, null]),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      createdOn: faker.date.past(),
    })),
  ),
);
