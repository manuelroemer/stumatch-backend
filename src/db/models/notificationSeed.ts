import { Notification } from './notification';
import faker from 'faker';
import { userSeed } from './userSeed';
import flatten from 'lodash/flatten';

export const notificationSeed: Array<Notification> = flatten(
  userSeed.map((user) => [
    {
      type: 'text',
      userId: user.id!,
      seen: null,
      title: 'Unseen Notification',
      content: faker.lorem.sentence(10),
    },
    {
      type: 'text',
      userId: user.id!,
      seen: true,
      title: 'Seen Notification',
      content: faker.lorem.sentence(10),
    },
    {
      type: 'text',
      userId: user.id!,
      seen: false,
      title: 'Marked-as-Unread Notification',
      content: faker.lorem.sentence(10),
    },
  ]),
);
