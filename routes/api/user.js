const passport = require('passport');
const express = require('express');
const router = express.Router();

const { user } = require('../../controllers/api');

router.use("/", (req, res) => {
    res.send("User path");
});

module.exports = router;
