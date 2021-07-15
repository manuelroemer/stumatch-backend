import { Notification, NotificationModel } from '../db/models/notification';
import { User } from '../db/models/user';
import { logger } from '../log';

export function tryCreateMatchRequestAcceptedByPartnerNotification(userId: string, matchPartner: User) {
  return tryCreateNotification({
    type: 'matchRequestFoundMatch',
    userId: userId,
    title: 'Match Accepted!',
    content: `${matchPartner.firstName} ${matchPartner.lastName} has accepted your match!`,
  });
}

export function tryCreateMatchRequestDeclinedByPartnerNotification(userId: string, matchPartner: User) {
  return tryCreateNotification({
    type: 'matchRequestDeclinedByPartner',
    userId: userId,
    title: 'Match Declined...',
    content: `Unfortunately, ${matchPartner.firstName} ${matchPartner.lastName} has declined your match...`,
  });
}

export function tryCreateMatchRequestFoundNotification(userId: string, matchPartner: User) {
  return tryCreateNotification({
    type: 'matchRequestFoundMatch',
    userId: userId,
    title: 'New Match!',
    content: `We have matched you with ${matchPartner.firstName} ${matchPartner.lastName}! You can now start chatting.`,
  });
}

export function tryCreateFriendRequestAcceptedNotification(userId: string, newFriend: User) {
  return tryCreateNotification({
    type: 'matchRequestAccepted',
    userId: userId,
    title: 'You have a new friend!',
    content: `${newFriend.firstName} ${newFriend.lastName} is now your friend!`,
  });
}

export async function tryCreateNotification(notification: Notification) {
  try {
    return await NotificationModel.create(notification);
  } catch (e) {
    logger.warning('Failed to create a notification.', notification, e);
  }
}
