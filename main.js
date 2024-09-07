'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const staticServer = require('./static.js');
const logger = require('./logger.js');
const CONFIG = require('./config');

const apiPath = path.join(process.cwd(), './api');
const routing = {};

const db = require('./db');

const server = require('./transports/index.js')(CONFIG.APP.transport);

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = require(filePath)(db);
  }

  staticServer('./static', { port: CONFIG.APP.STATIC_PORT, logger: logger });
  server(routing, { port: CONFIG.APP.API_PORT, logger: logger });
})();
