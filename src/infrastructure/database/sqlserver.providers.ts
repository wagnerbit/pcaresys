import { SqlServerService } from './sqlserver.service';
import { LoggerService } from '../crossCutting/log4Js/loggerService';
import { LoggerRepository } from '../repositories/loggerRepository';
import { Log4JsContext } from '../crossCutting/log4Js/log4JsContext';

export const SqlServerProvider = {
    provide: 'SqlServerService',
    useFactory: (log: LoggerService) => {
      return new SqlServerService(log);
    },
    inject: [LoggerService],
  };