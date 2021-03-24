const config = require('./config.json');

const HOSTNAME = config.HOSTNAME;
const PORT = config.PORT;

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use("local", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    function (username, password, done) {
        if(username == undefined)
            return done(new Error("err", false));
        return done(null, { username, password });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

const app = express();

app.use(express.json());
app.use(cookieParser("CookieSecret"));
app.use(session({
    secret: "SessionSecret",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 1000 } // 5 min.
}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send("But nobody came...");
})
app.use("/auth", require('./routes/auth'));
app.use("/api", require('./routes/api'));

app.listen(PORT, HOSTNAME, () => console.log(`API Server is running on ${HOSTNAME}:${PORT}`));