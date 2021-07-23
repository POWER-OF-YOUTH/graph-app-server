import passport from 'passport';
import express from 'express';
import { body } from 'express-validator';

import requestValidator from '../services/request_validator';
import authController from '../controllers/auth';

const authRouter = express.Router();

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

authRouter.post("/register",
    body("login").isString(),
    body("password").isString().isLength({ min: 6, max: 24 }),
    body("email").isEmail().normalizeEmail(),
    body("sex").isString().isIn(["male", "woman", "unknown"]),
    body("name").isString().isLength({ max: 50 }),
    body("surname").isString().isLength({ max: 50 }),
    body("patronymic").isString().isLength({ max: 50 }), // can be empty
    requestValidator,
    authController.register
);

authRouter.post("/login",
    body("login").isString(),
    body("password").isString(),
    requestValidator,
    passport.authenticate('local'),
    authController.login
);

authRouter.post("/logout", authController.logout)

authRouter.get("/check", authController.check);

export default authRouter;