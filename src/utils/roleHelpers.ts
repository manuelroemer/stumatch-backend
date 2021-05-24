import { Request } from 'express';
import { User, UserRole } from '../db/models/user';
import { ForbiddenError } from '../dtos/apiErrors';
import { getUserOrThrow } from './requestHelpers';

/**
 * Returns whether the given user has all of the specified roles.
 * @param user The user to be checked.
 * @param roles The required roles.
 */
export function hasRoles(user: User, roles: UserRole | Array<UserRole>) {
  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  return requiredRoles.every((requiredRole) => user.roles.includes(requiredRole));
}

/**
 * Validates that the requesting user either:
 * * has the `requiredId`...
 * * or alternatively has the specified roles.
 * @param req The request.
 * @param requiredId The ID that the user requires to access specific resources.
 * @param alternativelyRequiredRoles Required roles if the user does not have the required ID.
 */
export function validateThisUserHasIdOrRoles(
  req: Request,
  requiredId: string,
  alternativelyRequiredRoles: UserRole | Array<UserRole>,
) {
  const thisUser = getUserOrThrow(req);
  if (thisUser.id !== requiredId && !hasRoles(thisUser, alternativelyRequiredRoles)) {
    throw new ForbiddenError();
  }
}
