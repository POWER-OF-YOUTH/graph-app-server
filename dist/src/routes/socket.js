"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const socket_1 = __importDefault(require("../controllers/socket"));
const socketRouter = express_1.default.Router();
const validator = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        res.status(422).json(errors);
    else
        next();
};
socketRouter.get("/socket/:graphId", express_validator_1.param("graphId").isUUID(), express_validator_1.body("timeout").isInt().optional(), validator, socket_1.default.createServer);
exports.default = socketRouter;
