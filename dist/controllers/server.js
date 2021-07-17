"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const socket_io_1 = require("socket.io");
const app_1 = require("../app");
const servers = new Map();
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
function createServer(graphId, path, timeoutMs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const server = new socket_io_1.Server(app_1.httpServer);
        server.of(path).on("connection", socket => {
            socket.on("test", (data) => {
                console.log("test");
                console.log(data);
            });
            console.log("Connected!");
            socket.send("ok");
        });
        console.log("Server created!");
        servers.set(graphId, server);
        yield sleep(timeoutMs);
        while (server.of(path).sockets.values.length > 0)
            yield sleep(timeoutMs);
        (_a = servers.get(graphId)) === null || _a === void 0 ? void 0 : _a.close();
        servers.delete(graphId);
        console.log("Server closed");
    });
}
exports.createServer = createServer;
