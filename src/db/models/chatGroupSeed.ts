import { ChatGroup } from './chatGroup';

export const chatGroupSeed: Array<ChatGroup> = [
  {
    id: `40000000-0000-1000-8000-000000000000`,
    activeParticipantIds: ['00000000-0000-1000-8000-000000000000', '00000000-0000-1000-8000-000000000001'],
  },
  {
    id: `40000000-0000-1000-8000-000000000001`,
    activeParticipantIds: [
      '00000000-0000-1000-8000-000000000000',
      '00000000-0000-1000-8000-000000000001',
      '00000000-0000-2000-8000-000000000000',
    ],
  },
  {
    id: `40000000-0000-1000-8000-000000000002`,
    activeParticipantIds: ['00000000-0000-1000-8000-000000000000'],
  },
];
