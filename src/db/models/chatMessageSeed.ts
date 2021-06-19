import { ChatMessage } from './chatMessage';
import flatten from 'lodash/flatten';
import range from 'lodash/range';
import faker from 'faker';
import { chatGroupSeed } from './chatGroupSeed';

export const chatMessageSeed: Array<ChatMessage> = flatten(
  range(100).map((i) => ({
    id: `60000000-0000-1000-8000-${i.toString().padStart(12, '0')}`,
    chatGroupId: chatGroupSeed[0].id!,
    userId: faker.random.arrayElement(chatGroupSeed[0].activeParticipantIds),
    isDeleted: false,
    textContent: faker.lorem.words(),
    createdOn: faker.date.past(),
  })),
);
