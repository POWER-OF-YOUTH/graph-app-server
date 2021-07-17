"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = socket_io_client_1.io("http://localhost:3000");
socket.on("connect", () => {
    socket.emit("test", "datkmlka");
});
console.log(socket.connected);
