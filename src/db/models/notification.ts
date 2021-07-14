import { model, Document } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Notification extends DbObject {
  /**
   * The ID of the user who owns the notification.
   */
  userId: string;
  /**
   * The type discriminator of the notification.
   * Notifications of different types have different attributes.
   */
  type:
    | 'text'
    | 'matchRequestAcceptedByPartner'
    | 'matchRequestDeclinedByPartner'
    | 'matchRequestAccepted'
    | 'matchRequestFoundMatch';
  /**
   * Whether the user has seen the notification.
   * * `true`: The notification has been seen.
   * * `false`: The notification has explicitly been marked as unseen.
   * * `undefined | null`: The notification has not been seen yet.
   */
  seen?: boolean | null;
  /**
   * The title to be displayed by the notification.
   */
  title?: string;
  /**
   * The content to be displayed by the notification.
   */
  content?: string;
}

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
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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
