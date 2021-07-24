import { User } from '../db/models/user';
import { hasSomeRole } from '../utils/roleHelpers';

export function getEnrichedUserDto(user: User, thisUser: User) {
  return trimPrivateUserProfileInfo(user, thisUser);
}

function trimPrivateUserProfileInfo(userToReturn: User, thisUser: User) {
  const returnPublicProfileInfoOnly = thisUser.id !== userToReturn.id && !hasSomeRole(thisUser, ['admin', 'advertiser']);
  const result: Partial<User> = { ...userToReturn };

  // Private data which should *never* be returned.
  delete result.passwordHash;

  // Private data which should not be returned to other users apart from me.
  if (returnPublicProfileInfoOnly) {
    delete result.roles;
    delete result.email;
  }

  return result;
}
