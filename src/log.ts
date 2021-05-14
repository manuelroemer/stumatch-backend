import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'debug',
  transports: [new transports.Console({ format: format.simple() })],
});
