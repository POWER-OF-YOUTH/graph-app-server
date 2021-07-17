"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_manager_1 = __importDefault(require("../services/socket_manager"));
function createServer(req, res) {
    var _a;
    const path = req.path;
    const graphId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.graphId;
    const timeoutMs = req.body.timeout ? req.body.timeout : 5000;
    console.log(path);
    socket_manager_1.default.start(path, timeoutMs);
    res.status(200).send("ok");
}
const socketController = { createServer };
exports.default = socketController;
