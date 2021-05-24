import { model } from 'mongoose';
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

export type Notification = TextNotification;

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

export const NotificationModel = model<Notification>('Notification', notificationSchema);
