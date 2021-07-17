/// <reference types="node" />
import { Server } from 'socket.io';
import http from "http";
declare const app: import("express-serve-static-core").Express;
declare const httpServer: http.Server;
declare const io: Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>;
export { app, httpServer, io };
