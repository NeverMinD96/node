module.exports = {
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
  },
  APP: {
    STATIC_PORT: process.env.APP_STATIC_PORT,
    API_PORT: process.env.APP_API_PORT,
    /**
     * @type {'ws' | 'http'}
     */
    transport: 'http',
  },
};
