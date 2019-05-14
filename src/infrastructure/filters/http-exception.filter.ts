import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Inject,
} from '@nestjs/common';
import { LoggerService } from '../crossCutting/log4Js/loggerService';
import { LoggerRepository } from '../repositories/loggerRepository';
import { Log4JsContext } from '../crossCutting/log4Js/log4JsContext';
import * as util from 'util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  private _log = new LoggerService(new LoggerRepository(new Log4JsContext()));

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const expMsg = Object.assign(exception, {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    this._log.error(util.inspect(expMsg));

    response.status(status).json(exception.message ? exception.message : util.inspect(exception) );
  }
}