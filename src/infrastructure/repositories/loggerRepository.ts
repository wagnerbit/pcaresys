import { ILoggerRepository } from './interfaces/iLoggerRepository';
import { Injectable, Inject } from '@nestjs/common';
import { Log4JsContext } from '../crossCutting/log4Js/log4JsContext';

@Injectable()
export class LoggerRepository implements ILoggerRepository {
  protected _LOGCONTEXT: Log4JsContext;

  constructor(@Inject(Log4JsContext) logger: Log4JsContext) {
    this._LOGCONTEXT = logger;
  }

  log(message: string, context: string) {
    this._LOGCONTEXT.log(message, context);
  }
  error(message: string, trace: string, context: string) {
    this._LOGCONTEXT.error(message, trace, context);
  }
  warn(message: string, context: string) {
    this._LOGCONTEXT.warn(message, context);
  }
}
