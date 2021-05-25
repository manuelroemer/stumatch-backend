import { Notification } from './notification';
import faker from 'faker';
import { userSeed } from './userSeed';
import flatten from 'lodash/flatten';

export const notificationSeed: Array<Notification> = flatten(
  userSeed.map((user, index) => [
    {
      id: `10000000-0000-1000-8${index.toString().padStart(3, '0')}-000000000000`,
      type: 'text',
      userId: user.id!,
      seen: null,
      title: 'Unseen Notification',
      content: faker.lorem.sentence(10),
    },
    {
      id: `10000000-0000-1000-8${index.toString().padStart(3, '0')}-000000000001`,
      type: 'text',
      userId: user.id!,
      seen: true,
      title: 'Seen Notification',
      content: faker.lorem.sentence(10),
    },
    {
      id: `10000000-0000-1000-8${index.toString().padStart(3, '0')}-000000000002`,
      type: 'text',
      userId: user.id!,
      seen: false,
      title: 'Marked-as-Unread Notification',
      content: faker.lorem.sentence(10),
    },
  ]),
);
