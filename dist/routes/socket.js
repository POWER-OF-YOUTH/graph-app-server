"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const server_1 = require("../controllers/server");
const socketRouter = express_1.default.Router();
const validator = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        res.status(422).json(errors);
    else
        next();
};
socketRouter.get("/socket/:graphId", express_validator_1.param("graphId").isUUID(), express_validator_1.body("timeout").isInt().optional(), validator, (req, res) => {
    var _a;
    const path = req.path;
    const graphId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.graphId;
    const timeoutMs = req.body.timeout ? req.body.timeout : 5000;
    console.log(timeoutMs);
    server_1.createServer(path, graphId, timeoutMs);
    res.status(200).send("ok");
});
socketRouter.connect("/socket/:graphId", express_validator_1.param("graphId").isUUID(), validator, (req, res) => {
});
exports.default = socketRouter;
