import { CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { LoggerService } from '../crossCutting/log4Js/loggerService';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly _log: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const execContext = context.getArgs();

    this._log.info(`${moment(new Date()).format('DD/MM/YYYY HH:mm:ss')} - ${execContext[0].method}: ${execContext[0].url}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this._log.info(`StatusCode: ${execContext[1].statusCode}`)));
  }
}
