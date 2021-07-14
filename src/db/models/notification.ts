import { model, Document } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface BaseNotification<NotificationType extends string> extends DbObject {
  /**
   * The ID of the user who owns the notification.
   */
  userId: string;
  /**
   * The type discriminator of the notification.
   * Notifications of different types have different attributes.
   */
  type: NotificationType;
  /**
   * Whether the user has seen the notification.
   * * `true`: The notification has been seen.
   * * `false`: The notification has explicitly been marked as unseen.
   * * `undefined | null`: The notification has not been seen yet.
   */
  seen?: boolean | null;
}

/**
 * A notification with arbitrary text.
 * Mainly intended for development, testing and generally as a PoC.
 */
export interface TextNotification extends BaseNotification<'text'> {
  title?: string;
  content?: string;
}

export interface AcceptedMatchRequestNotification extends BaseNotification<'matchRequestAcceptedByPartner'> {
  matchRequestId: string;
}

export interface DeclinedMatchRequestNotification extends BaseNotification<'matchRequestDeclinedByPartner'> {
  matchRequestId: string;
}

export interface FriendRequestAcceptedNotification extends BaseNotification<'matchRequestAccepted'> {
  friendsListEntryId: string;
}

export interface FoundMatchNotification extends BaseNotification<'matchRequestFoundMatch'> {
  matchRequestId: string;
}

export type Notification =
  | TextNotification
  | AcceptedMatchRequestNotification
  | DeclinedMatchRequestNotification
  | FriendRequestAcceptedNotification
  | FoundMatchNotification;

const notificationSchema = createDbObjectSchema<Notification>(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: null,
    },
  },
  { strict: false },
);

notificationSchema.post('save', (doc: Document & Notification, next) => {
  emitResourceChangedEvent(
    {
      resourceType: 'notification',
      changeType: 'changed',
      id: doc.id,
    },
    doc.userId,
  );

  next();
});

export const NotificationModel = model<Notification>('Notification', notificationSchema);
