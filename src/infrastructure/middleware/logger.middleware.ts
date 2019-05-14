import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../crossCutting/log4Js/loggerService';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly _log: LoggerService) {}

  use(req: any, res: any, next: () => void) {
    this._log.info(
      `Middleware - ${moment(new Date()).format('DD/MM/YYYY HH:mm:ss')}`,
    );
    next();
  }
}
