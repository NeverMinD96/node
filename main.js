'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const staticServer = require('./static.js');
const load = require('./load.js');
const db = require('./db.js');
const hash = require('./hash.js');
const logger = require('./logger.js');
const CONFIG = require('./config');

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};

const apiPath = path.join(process.cwd(), './api');
const routing = {};

const server = require('./transports/index.js')(CONFIG.APP.transport);

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer('./static', { port: CONFIG.APP.STATIC_PORT, logger: logger });
  server(routing, { port: CONFIG.APP.API_PORT, logger: logger });
})();
