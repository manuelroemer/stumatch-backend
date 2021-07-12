import { ReadChatMessage } from './readChatMessage';

export const readChatMessageSeed: Array<ReadChatMessage> = [
  {
    userId: '00000000-0000-1000-8000-000000000000',
    chatGroupId: '40000000-0000-1000-8000-000000000000',
    lastMessageReadOn: new Date(2021, 1, 1),
  },
  {
    userId: '00000000-0000-1000-8000-000000000001',
    chatGroupId: '40000000-0000-1000-8000-000000000000',
    lastMessageReadOn: new Date(),
  },
];
