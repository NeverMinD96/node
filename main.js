'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const staticServer = require('./lib/static.js');
const logger = require('./lib/logger.js');
const CONFIG = require('./config');
const common = require('./lib/common');
const db = require('./lib/db');
const load = require('./lib/load');

const server = require('./transports/index.js')(CONFIG.APP.transport);

const sandbox = {
  api: Object.freeze({}),
  db: Object.freeze(db),
  console: Object.freeze(logger),
  common: Object.freeze(common),
};

const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer('./static', { port: CONFIG.APP.STATIC_PORT, console: logger });
  server(routing, { port: CONFIG.APP.API_PORT, console: logger });
})();
