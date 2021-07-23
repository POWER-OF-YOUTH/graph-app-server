import { Server, ServerOptions } from 'socket.io';
import passport from 'passport';
import validator from 'validator';
import http from "http";
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth';
import apiRouter from './routes/api';

import driver from './services/driver';
import User from './models/user';
import UserMapper from './models/user_mapper';

//import socketRouter from './routes/socket';
import socketHandler from './socket'
import { ClientEvents, ServerEvents } from './socket/events';

const LocalStrategy = require('passport-local').Strategy;

passport.use("local", new LocalStrategy(
    {
        usernameField: "login",
        passwordField: "password"
    },
    async function (login: string, password: string, done: any) {
        try {
            const um = new UserMapper(driver);
            const user: User | null = await um.findByLogin(login);

            if (user == null)
                done(null, false, { message: "Incorrect login!" });
            else if (user.password !== password)
                done(null, false, { message: "Incorrect password!" });
            else
                done(null, { login: user?.login, password: user?.password });
        }
        catch (err) {
            done(err); 
        }
    }
));

passport.serializeUser(function(user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function(obj: any, done: any) {
    done(null, obj);
});

const app = express();
const httpServer = http.createServer(app);
const io = new Server<ClientEvents, ServerEvents>(httpServer);

io.of("/socket").on("connection", socketHandler);

app.use(express.json());
app.use(cookieParser("CookieSecret"));
app.use(session({
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
})

//app.use(socketRouter);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export { app, httpServer, io };
