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
exports.io = exports.httpServer = exports.app = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const driver_1 = __importDefault(require("./services/driver"));
const user_mapper_1 = __importDefault(require("./models/user_mapper"));
//import socketRouter from './routes/socket';
const socket_handler_1 = __importDefault(require("./socket_handler"));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use("local", new LocalStrategy({
    usernameField: "login",
    passwordField: "password"
}, function (login, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const um = new user_mapper_1.default(driver_1.default);
            const user = yield um.findByLogin(login);
            if (user == null)
                done(null, false, { message: "Incorrect login!" });
            else if (user.password !== password)
                done(null, false, { message: "Incorrect password!" });
            else
                done(null, { login: user === null || user === void 0 ? void 0 : user.login, password: user === null || user === void 0 ? void 0 : user.password });
        }
        catch (err) {
            done(err);
        }
    });
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
const app = express_1.default();
exports.app = app;
const httpServer = http_1.default.createServer(app);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer);
exports.io = io;
io.of("/socket").on("connection", socket_handler_1.default);
app.use(express_1.default.json());
app.use(cookie_parser_1.default("CookieSecret"));
app.use(express_session_1.default({
    secret: "SessionSecret",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
    res.send("But nobody came...");
});
//app.use(socketRouter);
app.use("/auth", auth_1.default);
