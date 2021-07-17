"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const request_validator_1 = __importDefault(require("../services/request_validator"));
const auth_1 = __importDefault(require("../controllers/auth"));
const authRouter = express_1.default.Router();
/** User Schema:
 * {
 *  login: String,
 *  password: String,
 *  email: String,
 *  sex: String,
 *  name: String,
 *  surname: String,
 *  patronymic: String
 * }
 */
authRouter.post("/register", express_validator_1.body("login").isString(), express_validator_1.body("password").isString().isLength({ min: 6, max: 24 }), express_validator_1.body("email").isEmail(), express_validator_1.body("sex").isString().isIn(["male", "woman", "unknown"]), express_validator_1.body("name").isString().isLength({ max: 50 }), express_validator_1.body("surname").isString().isLength({ max: 50 }), express_validator_1.body("patronymic").isString().isLength({ max: 50 }), // can be empty
request_validator_1.default, auth_1.default.register);
authRouter.post("/login", express_validator_1.body("login").isString(), express_validator_1.body("password").isString(), request_validator_1.default, passport_1.default.authenticate('local'), auth_1.default.login);
authRouter.post("/logout", auth_1.default.logout);
authRouter.get("/check", auth_1.default.check);
exports.default = authRouter;
