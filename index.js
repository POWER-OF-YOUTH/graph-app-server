const config = require('./config.json');

const HOSTNAME = config.HOSTNAME;
const PORT = config.PORT;

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    if(username == undefined)
        return done(new Error("err", false));
    return done(null, {username, password});
}));

passport.serializeUser(function(user, done) {
    // TODO:
    done(null, `${user.username}`);
});

passport.deserializeUser(function(user, done) {
    // TODO:
    done(null, { username: user, password: 123 });
});

const app = express();

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

app.use("/api", require('./routes/api'));

app.listen(PORT, HOSTNAME, () => console.log(`API Server is running on ${HOSTNAME}:${PORT}`));