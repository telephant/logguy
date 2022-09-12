import { LogguyLevel } from './interface';

export const LEVEL_MAP: { [k: string]: string } = {
  [LogguyLevel.debug]: 'DEBUG',
  [LogguyLevel.info]: 'INFO',
  [LogguyLevel.warn]: 'WARN',
  [LogguyLevel.error]: 'ERROR',
};
