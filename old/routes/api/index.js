const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../../services/ensureAuthenticated');

router.use("/user", ensureAuthenticated, require('./user'));
//router.use("/graphs", ensureAuthenticated, require('./graphs'));

module.exports = router;
