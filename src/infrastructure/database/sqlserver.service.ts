import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { LoggerService } from '../crossCutting/log4Js/loggerService';
// const sqlSrv = require('mssql');

@Injectable()
export class SqlServerService {
  private connection: any;
  private sqlConfigObj: any;
  private static pool: any;

  constructor(private readonly _log: LoggerService) {
    const config = new ConfigService(
      `${process.env.NODE_ENV ? process.env.NODE_ENV : 'DEV'}.env`,
    );

    this.sqlConfigObj = {
      user: config.get('SQLSRV_USER'),
      password: config.get('SQLSRV_PASSWORD'),
      server: config.get('SQLSRV_SERVER'),
      database: config.get('SQLSRV_DATABASE'),
      pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000,
      },
    };

    // sqlSrv.on('error', err => {
    //     this._log.error(err);
    //     // ... error handler
    // });
  }

  async getPool(): Promise<any> {
    if (!SqlServerService.pool) {
      this._log.info('SqlSrv - Pool');
      // SqlServerService.pool = await sqlSrv.connect(this.sqlConfigObj);
    }

    return SqlServerService.pool;
  }

  async query(sql: string, binds: any): Promise<any> {
    let rest = null;

    try {
      const pool = await this.getPool();
      rest = await pool.request().query(sql);
    } catch (err) {
      this._log.error(err);
      throw err;
    }

    return rest;
  }

  async execute(procedureSql: string, binds: any): Promise<any> {
    let rest = null;

    try {
      const pool = await this.getPool();
      rest = await pool.request().execute(procedureSql);
    } catch (err) {
      this._log.error(err);
      throw err;
    }

    return rest;
  }
}
