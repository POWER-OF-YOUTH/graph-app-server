"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = void 0;
const config = require('../config/server.json');
const HOSTNAME = config.HOSTNAME;
const PORT = config.PORT;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = __importDefault(require("./routes/socket"));
/*
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

passport.use("local", new LocalStrategy(
    {
        usernameField: "login",
        passwordField: "password"
    },
    async function (login, password, done) {
        try {
            const user = await User.findByLogin(login);

            if (user == null)
                done(null, false, { message: "Incorrect login!" });
            else if (user.password !== password)
                done(null, false, { message: "Incorrect password!" });
            else
                done(null, { login: user.login, password: user.password });
        }
        catch (err) {
            done(err);
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
*/
/*
interface ClientEvents {
    "graph:update";
    "graph:delete";
    "user:connect";
    "user:leave";
    "template:create";
    "template:delete";
    "node:create";
    "node:select";
    "node:edit";
    "node:delete";
    "node:drag";
    "node:drop";
    "relation:create";
    "relation:select";
    "relation:delete";
}

interface ServerEvents {
    "graph:updated";
    "graph:deleted";
    "user:connected";
    "user:gone";
    "template:created";
    "template:deleted";
    "node:created";
    "node:selected";
    "node:edited";
    "node:deleted";
    "node:dragged";
    "node:dropped";
    "relation:created";
    "relation:selected";
    "relation:deleted";
}
*/
const app = express_1.default();
exports.app = app;
const httpServer = http_1.default.createServer(app);
exports.httpServer = httpServer;
app.use(express_1.default.json());
app.use(cookie_parser_1.default("CookieSecret"));
/*
app.use(session({
    secret: "SessionSecret",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 1000 } // 5 min.
}));
app.use(passport.initialize());
app.use(passport.session());
*/
app.get("/", (req, res) => {
    res.send("But nobody came...");
});
app.use(socket_1.default);
/*
app.use("/auth", require('./routes/auth'));
app.use("/api", require('./routes/api'));
*/
httpServer.listen(PORT, HOSTNAME, () => console.log(`API Server is running on ${HOSTNAME}:${PORT}`));
