/**
 * Gets a WS room identifier unique to the user with the specified ID.
 * Emitting in this room will send the message to that user only.
 * @param userId The ID of the user whose unique room identifer should be returned.
 */
export function getUserRoom(userId: string) {
  return `user:${userId}`;
}
