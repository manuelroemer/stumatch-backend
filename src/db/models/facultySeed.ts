import { Faculty } from './faculty';

export const facultySeed: Array<Faculty> = [
  {
    id: '00000000-0000-1000-8000-000000000000',
    name: 'Informatik',
    studyPrograms: [
      {
        _id: '00000000-0000-1000-8000-000000000014',
        name: 'Theoretische Informatik',
      },
      {
        _id: '00000000-0000-1000-8000-000000000021',
        name: 'Cyber Trust',
      },
    ],
  },
];
