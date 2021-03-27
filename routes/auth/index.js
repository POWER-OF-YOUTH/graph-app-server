const passport = require('passport');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const user = require('../../controllers/user');

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
router.post("/register",
    body("login").isString(),
    body("password").isLength({ min: 6, max: 24 }),
    body("email").isEmail(),
    body("sex").isString(),
    body("name").isString().isLength({ max: 50 }),
    body("surname").isString().isLength({ max: 50 }),
    body("patronymic").isString().isLength({ max: 50 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        else
            next();
    },
    user.checkEmailExisting,
    user.checkLoginExisting,
    (req, res) => {
        user.create(req.body)
            .then(() => res.status(200).send("ok"))
            .catch(err => res.status(500).send(err));
    }
);

router.post("/login",
    body("login").isString(),
    body("password").isString(),
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        else
            next();
    },
    passport.authenticate('local'),
    (req, res) => {
        res.status(200).send("ok");
    }
);

router.post("/logout", (req, res) => {
    req.session.destroy();
    
    res.status(200).send("ok");
})

module.exports = router;