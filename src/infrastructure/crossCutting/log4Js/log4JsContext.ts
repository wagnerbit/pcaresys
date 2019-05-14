import * as Log4js from 'log4js';
import { Log4js as logger} from 'log4js';
import { Injectable, LoggerService as ILogger } from '@nestjs/common';

@Injectable()
export class Log4JsContext implements ILogger{

    public readonly _LOG4JS: logger = Log4js;

    /**
     *
     */
    constructor() {
        this._LOG4JS.configure({
            appenders: { console: { type: 'console' } },
            categories: { default: { appenders: [ 'console' ], level: 'all' } },
          });
    }

    log(message: string, context?: string) {
        const resLogger = this._LOG4JS.getLogger('system');
        resLogger.level = 'debug';
        resLogger.info(message);
    }
    error(message: string, trace?: string, context?: string) {
        const errorLogger = this._LOG4JS.getLogger('error');
        errorLogger.level = 'debug';
        errorLogger.error(message);
    }
    warn(message: string, context?: string) {
        const warnLogger = this._LOG4JS.getLogger('warn');
        warnLogger.level = 'warn';
        warnLogger.warn(message);
    }
}