  import sqlite3 from 'sqlite3';
  import { open } from 'sqlite';

  export const openDB = async () => {
    return open({
      filename: process.env.SQLITE_DB_PATH || './dev.db',
      driver: sqlite3.Database,
    });
  };
