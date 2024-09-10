'use strict';

module.exports = {
  DB: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  PG_ADMIN: {
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
  },
  APP: {
    STATIC_PORT: process.env.APP_STATIC_PORT,
    API_PORT: process.env.APP_API_PORT,
    transport: 'http',
  },
};
