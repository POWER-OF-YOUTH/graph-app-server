"use strict";
const neo4j = require('neo4j-driver');
const config = require('../../config/driver.json');
const auth = neo4j.auth.basic(config.DATABASE_USERNAME, config.DATABASE_PASSWORD);
const driver = neo4j.driver(config.DATABASE_HOSTNAME, auth, { disableLosslessIntegers: true });
module.exports = driver;
