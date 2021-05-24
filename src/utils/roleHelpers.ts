import { User, UserRole } from '../db/models/user';

/**
 * Returns whether the given user has all of the specified roles.
 * @param user The user to be checked.
 * @param roles The required roles.
 */
export function hasRoles(user: User, roles: UserRole | Array<UserRole>) {
  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  return requiredRoles.every((requiredRole) => user.roles.includes(requiredRole));
}
