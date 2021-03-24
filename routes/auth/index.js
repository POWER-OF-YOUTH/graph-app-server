const passport = require('passport');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post("/register", 
    body("email").isEmail(), 
    (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors);
    }
    else
        res.redirect("/");
});
router.post("/login", passport.authenticate('local', { successRedirect: "/" }));
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;