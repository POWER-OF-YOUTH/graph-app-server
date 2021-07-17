/// <reference types="node" />
import http from "http";
declare const app: import("express-serve-static-core").Express;
declare const httpServer: http.Server;
export { app };
export { httpServer };
