import { ContactRequest } from './contactRequest';

export const contactRequestSeed: Array<ContactRequest> = [
  {
    userId: '00000000-0000-1000-8000-000000000001',
    name: 'student',
    email: 'stumatch@student.com',
    type: 'role',
    message: 'Please change my role, so that I can create posts.',
    status: 'open',
  },
  {
    userId: '00000000-0000-1000-8000-000000000004',
    name: 'Roma Gibson',
    email: 'Brett_Cummerata@gmail.com',
    type: 'featureBug',
    message: 'Feature request: A dark mode would be nice !',
    status: 'closed',
  },
  {
    userId: '00000000-0000-1000-8000-000000000005',
    name: 'Richard Weber',
    email: 'Richard93@yahoo.com',
    type: 'featureBug',
    message: 'I have a bug, I can not see the post or advertisement details. ',
    status: 'inProgress',
  },
  {
    userId: '00000000-0000-1000-8000-000000000007',
    name: 'Dylan Moore',
    email: 'Dylan.Moore2@gmail.com',
    type: 'role',
    message: 'Please change my role, so i can create advertisements',
    status: 'open',
  },
];
