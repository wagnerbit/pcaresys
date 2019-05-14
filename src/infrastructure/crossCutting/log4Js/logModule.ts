import { Module, Global } from '@nestjs/common';
import { LoggerService } from './loggerService';
import { LoggerRepository } from '../../repositories/loggerRepository';
import { Log4JsContext } from './log4JsContext';

@Global()
@Module({
    imports: [],
    providers: [
      LoggerService,
      LoggerRepository,
      Log4JsContext],
    exports: [
      LoggerService,
      LoggerRepository,
      Log4JsContext,
    ],
  })
  export class LogModule {
  }