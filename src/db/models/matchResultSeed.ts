import { MatchResult } from './matchResult';

export const matchResultSeed: Array<MatchResult> = [
  {
    id: '10000000-0000-1000-8000-000000000000',
    matchRequest1Id: '00000000-0000-1000-8000-000000000000',
    matchRequest2Id: '00000000-0000-1000-8000-000000000001',
    acceptedByUser1: null,
    acceptedByUser2: null,
    chatGroupId: null,
  },
  {
    id: '10000000-0000-1000-8000-000000000001',
    matchRequest1Id: '00000000-0000-1000-8000-000000000002',
    matchRequest2Id: '00000000-0000-1000-8000-000000000003',
    acceptedByUser1: true,
    acceptedByUser2: null,
    chatGroupId: null,
  },
  {
    id: '10000000-0000-1000-8000-000000000002',
    matchRequest1Id: '00000000-0000-1000-8000-000000000004',
    matchRequest2Id: '00000000-0000-1000-8000-000000000005',
    acceptedByUser1: null,
    acceptedByUser2: true,
    chatGroupId: null,
  },
  {
    id: '10000000-0000-1000-8000-000000000003',
    matchRequest1Id: '00000000-0000-1000-8000-000000000006',
    matchRequest2Id: '00000000-0000-1000-8000-000000000007',
    acceptedByUser1: true,
    acceptedByUser2: true,
    chatGroupId: '50000000-0000-1000-8000-000000000007',
  },
  {
    id: '10000000-0000-1000-8000-000000000004',
    matchRequest1Id: '00000000-0000-1000-8000-000000000008',
    matchRequest2Id: '00000000-0000-1000-8000-000000000009',
    acceptedByUser1: false,
    acceptedByUser2: null,
    chatGroupId: null,
  },
  {
    id: '10000000-0000-1000-8000-000000000005',
    matchRequest1Id: '00000000-0000-1000-8000-000000000010',
    matchRequest2Id: '00000000-0000-1000-8000-000000000011',
    acceptedByUser1: null,
    acceptedByUser2: false,
    chatGroupId: null,
  },
];
