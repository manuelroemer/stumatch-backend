import { ChatMessage } from './chatMessage';
import flatten from 'lodash/flatten';
import range from 'lodash/range';
import faker from 'faker';
import { chatGroupSeed } from './chatGroupSeed';
import { ChatGroup } from './chatGroup';

export const chatMessageSeed: Array<ChatMessage> = flatten([
  ...generateRandomMessages(chatGroupSeed.find((x) => x.id === '40000000-0000-1000-8000-000000000000')!),
  ...generateRandomMessages(chatGroupSeed.find((x) => x.id === '40000000-0000-1000-8000-000000000007')!),
]);

function generateRandomMessages(chatGroup: ChatGroup, count = 500) {
  return range(count).map(() => ({
    chatGroupId: chatGroup.id!,
    userId: faker.random.arrayElement(chatGroup.activeParticipantIds),
    isDeleted: false,
    textContent: faker.lorem.words(),
    createdOn: faker.date.past(),
  }));
}
