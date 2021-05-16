const passport = require('passport');
const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../../lib/ensureAuthenticated');
const { route } = require('./user');

router.use("/user", ensureAuthenticated, require('./user'));
router.use("/graphs", ensureAuthenticated, require('./graphs'));

module.exports = router;
