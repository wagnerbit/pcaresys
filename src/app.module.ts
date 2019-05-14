import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './infrastructure/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { LogModule } from './infrastructure/crossCutting/log4Js/logModule';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [UserModule, LogModule, DatabaseModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
