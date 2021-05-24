import { Server as HttpServer, IncomingMessage } from 'http';
import passport from 'passport';
import { Server as SocketServer, Socket } from 'socket.io';
import { User } from '../db/models/user';
import { logger } from '../log';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { getUserRoom } from './rooms';

export function setupWs(httpServer: HttpServer) {
  const ws = new SocketServer(httpServer, {
    path: '/ws',
    cors: {
      methods: ['GET', 'POST'],
    },
  });

  ws.use(wrapExpressMiddleware(passport.initialize()));
  ws.use(wrapExpressMiddleware(authenticateJwt));

  ws.on('connection', (socket: ExtendedSocket) => {
    const userId = socket.request.user!.id!;
    const uniqueRoom = getUserRoom(userId);
    socket.join(uniqueRoom);
    logger.info(`User ${userId} established WS connection. Added to room ${uniqueRoom}. Socket ID: ${socket.id}.`);
  });

  logger.info('WebSockets have been setup.');
  return ws;
}

/**
 * Makes (most) Express middlewares available to socket.io.
 * See "Compatibility with Express middleware": https://socket.io/docs/v4/middlewares/
 * @param middleware The Express middleware to be applied.
 */
function wrapExpressMiddleware(middleware: any) {
  return (socket: any, next: any) => middleware(socket.request, {}, next);
}

/** Extended Socket props coming from middlewares. */
interface ExtendedSocket extends Socket {
  request: IncomingMessage & { user?: User };
}
