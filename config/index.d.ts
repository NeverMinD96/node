interface CONFIGURATION {
  DB: {
    host: string;
    port: string;
    database: string;
    user: string;
    password: string;
  };
  PG_ADMIN: {
    database: string;
    user: string;
    password: string;
  };
  APP: {
    STATIC_PORT: string;
    API_PORT: string;
    transport: 'http' | 'ws';
  };
}

declare const config: CONFIGURATION;
export default config;
