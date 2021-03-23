const passport = require('passport');
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../lib/authMiddleware');

router.use("/login", passport.authenticate('local', { successRedirect: "/" }));
router.use("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

router.use("/user", authMiddleware)
    .use(require('./user'));

module.exports = router;