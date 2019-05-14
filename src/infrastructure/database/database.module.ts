import { Module, Global } from '@nestjs/common';
import { SqlServerProvider } from './sqlserver.providers';


@Global()
@Module({
  providers: [SqlServerProvider],
  exports: [SqlServerProvider],
})
export class DatabaseModule {}
