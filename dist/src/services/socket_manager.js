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
const socket_io_1 = require("socket.io");
const app_1 = require("../app");
const io = new socket_io_1.Server(app_1.httpServer);
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
class SocketManager {
    constructor() {
        this.paths = new Set();
        this.server = new socket_io_1.Server(app_1.httpServer);
    }
    /**
     *
     * @param {string} path
     * @param {Server} server
     * @param {number} ms
     * @returns {Promise<void>}
     */
    start(path, ms) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.paths.has(path))
                return;
            this.paths.add(path);
            const namespace = this.server.of(path);
            namespace.on("connection", socket => {
                socket.on("test", (data) => {
                    console.log("test");
                    console.log(data);
                });
                console.log("Connected!");
                socket.send("ok");
            });
            console.log("Server created!");
            yield sleep(ms);
            while (namespace.sockets.values.length > 0)
                yield sleep(ms);
            namespace.disconnectSockets();
            namespace.removeAllListeners();
            this.server._nsps.delete(path);
            this.paths.delete(path);
            console.log("Server closed!");
        });
    }
}
const socketManager = new SocketManager();
exports.default = socketManager;
