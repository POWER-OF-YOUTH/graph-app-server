import neo4j from 'neo4j-driver';
import * as config from '../../config/driver.json';

const auth =  neo4j.auth.basic(config.DATABASE_USERNAME, config.DATABASE_PASSWORD);
const driver = neo4j.driver(config.DATABASE_HOSTNAME, auth, { disableLosslessIntegers: true });

export default driver;
