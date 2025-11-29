// types/better-sqlite3.d.ts
declare module "better-sqlite3" {
  interface Options {
    readonly memory?: boolean;
    readonly readonly?: boolean;
    readonly fileMustExist?: boolean;
    readonly timeout?: number;
    readonly verbose?: (...args: any[]) => void;
  }

  interface Statement {
    run(...params: any[]): any;
    get(...params: any[]): any;
    all(...params: any[]): any[];
    iterate(...params: any[]): Iterable<any>;
    raw(flag?: boolean): this;
    columns(): { name: string; column: string }[];
    bind(...params: any[]): this;
  }

  interface Database {
    prepare(sql: string): Statement;
    exec(sql: string): void;
    close(): void;
    transaction<T extends (...args: any[]) => any>(fn: T): T;
  }

  function Database(filename: string, options?: Options): Database;

  export = Database;
}
