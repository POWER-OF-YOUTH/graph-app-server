const config = require('./database/config.json');
const { Core } = require('graph-app-core');
const core = new Core(config.DATABASE_HOSTNAME, config.DATABASE_USERNAME, config.DATABASE_PASSWORD);

module.exports = core;
