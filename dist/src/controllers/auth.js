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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = __importDefault(require("../services/driver"));
const user_mapper_1 = __importDefault(require("../models/user_mapper"));
const user_1 = require("../models/user");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const um = new user_mapper_1.default(driver_1.default);
            const userData = req.body;
            const user = new user_1.User(userData);
            yield um.save(user);
            res.json({
                login: user.login,
                password: user.password,
                email: user.email,
                sex: user.sex,
                name: user.name,
                surname: user.surname,
                patronymic: user.patronymic
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const um = new user_mapper_1.default(driver_1.default);
            const login = req.body.login;
            const user = yield um.findByLogin(login);
            res.json({
                login: user.login,
                password: user.password,
                email: user.email,
                sex: user.sex,
                name: user.name,
                surname: user.surname,
                patronymic: user.patronymic
            });
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.session.destroy(undefined);
        res.json({});
    });
}
function check(req, res) {
    if (req.user)
        res.status(200).send();
    else
        res.status(401).send();
}
const authController = { register, login, logout, check };
exports.default = authController;
