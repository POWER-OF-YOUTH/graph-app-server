import * as config from '../config/server.json';
const HOSTNAME = config.HOSTNAME;
const PORT = config.PORT;

import { app, httpServer, io } from './app';

httpServer.listen(PORT, HOSTNAME, () => {console.log(`API Server is running on ${HOSTNAME}:${PORT}`)});