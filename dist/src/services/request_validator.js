"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator');
function requestValidator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        res.status(422).json(errors);
    else
        next();
}
exports.default = requestValidator;
