const passport = require('passport');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const user = require('../controllers/api/user');
const validator = require('../lib/validator');

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
    body("password").isString().isLength({ min: 6, max: 24 }),
    body("email").isEmail(),
    body("sex").isString().isIn(["male", "woman", "unknown"]),
    body("name").isString().isLength({ max: 50 }),
    body("surname").isString().isLength({ max: 50 }),
    body("patronymic").isString().isLength({ max: 50 }), // can be empty
    validator,
    user.checkEmailExisting,
    user.checkLoginExisting,
    async (req, res) => {
        try {
            let userDescription = await user.create(req.body);

            res.json(userDescription);
        }
        catch (error) {
            res.status(500).json({
                errors: [
                    {
                        msg: "Database error!"
                    }
                ]
            });
        }
    }
);

router.post("/login",
    body("login").isString(),
    body("password").isString(),
    validator,
    passport.authenticate('local'),
    async (req, res) => {
        try {
            let userDescription = await user.find(req.body.login);

            res.json(userDescription);
        }
        catch (error) {
            res.status(500).json({
                errors: [
                    {
                        msg: "Database error!"
                    }
                ]
            });
        }
    }
);

router.post("/logout", (req, res) => {
    req.session.destroy();
    
    res.json({});
})

module.exports = router;
