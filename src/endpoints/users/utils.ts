import { User } from '../../db/models/user';

export function formatUserResponse(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...result } = user;
  return result;
}
