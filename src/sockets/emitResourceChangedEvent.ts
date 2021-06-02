import { ws } from '..';
import { getUserRoom } from './rooms';

export interface ResourceChangedEvent {
  resourceType: string;
  changeType: 'changed' | 'deleted';
  id: string;
}

export function emitResourceChangedEvent(event: ResourceChangedEvent, userId: string) {
  ws.to(getUserRoom(userId)).emit('resource-changed', event);
}
