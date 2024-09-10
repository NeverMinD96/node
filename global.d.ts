import * as Common from './lib/common';
import * as Config from './config';

declare global {
  namespace api {}
  const console: Console;
  const common: typeof Common;
  const config: typeof Config;
}

type QueryResult = Promise<object[]>;

declare interface DBInstance {
  query(sql: string, args: any): Promise<void>;
  read(id: string, fields: string[]): Promise<void>;
  create(record: object): QueryResult;
  update(id: number, record: object): QueryResult;
  deleteRecord(id: number): QueryResult;
}
