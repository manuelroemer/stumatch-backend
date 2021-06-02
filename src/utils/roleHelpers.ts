import { Request } from 'express';
import { User, UserRole } from '../db/models/user';
import { ForbiddenError } from '../dtos/apiErrors';
import { getUserOrThrow } from './requestHelpers';

/**
 * Returns whether the given user has at least one of the specified roles.
 * @param user The user to be checked.
 * @param requiredRole The required role(s).
 *   This can be an array of multiple roles of which one must be assigned to the user.
 */
export function hasSomeRole(user: User, requiredRole: UserRole | Array<UserRole>) {
  const allRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return allRoles.some((requiredRole) => user.roles.includes(requiredRole));
}

/**
 * Returns whether the given user has the required ID.
 * @param user The user to be checked.
 * @param requiredId The required ID(s).
 *   This can be an array of multiple IDs of which one must be assigned to the user.
 */
export function hasSomeId(user: User, requiredId: string | Array<string>) {
  const allIds = typeof requiredId === 'string' ? [requiredId] : requiredId;
  return allIds.some((requiredId) => user.id === requiredId);
}

/**
 * Validates that the requesting user has at least one of the specified roles.
 * @param req The request.
 * @param requiredRole The required role(s).
 *   This can be an array of multiple roles of which one must be assigned to the user.
 */
export function validateThisUserHasSomeRole(req: Request, requiredRole: UserRole | Array<UserRole>) {
  const thisUser = getUserOrThrow(req);
  if (!hasSomeRole(thisUser, requiredRole)) {
    throw new ForbiddenError();
  }
}

/**
 * Validates that the requesting user either:
 * * has the `requiredId`...
 * * or alternatively has the specified roles.
 * @param req The request.
 * @param requiredId  The required ID.
 *   This can be an array of multiple IDs of which one must match the user's ID.
 * @param alternativelyRequiredRoles  The required role(s).
 *   This can be an array of multiple roles of which one must be assigned to the user.
 */
export function validateThisUserHasSomeIdOrSomeRole(
  req: Request,
  requiredId: string | Array<string>,
  alternativelyRequiredRoles: UserRole | Array<UserRole>,
) {
  const thisUser = getUserOrThrow(req);
  if (!hasSomeId(thisUser, requiredId) && !hasSomeRole(thisUser, alternativelyRequiredRoles)) {
    throw new ForbiddenError();
  }
}
