import { ws } from '..';
import { getUserRoom } from './rooms';

export interface ResourceChangedEvent {
  resourceType: string;
  changeType: 'changed' | 'deleted';
  id: string;
}

export function emitResourceChangedEvent(event: ResourceChangedEvent, userIds: string | Array<string>) {
  const finalUserIds = typeof userIds === 'string' ? [userIds] : userIds;
  const rooms = finalUserIds.map(getUserRoom);
  ws.to(rooms).emit('resource-changed', event);
}
