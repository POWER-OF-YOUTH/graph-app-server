const passport = require('passport');
const express = require('express');
const router = express.Router();

router.use("/", (req, res) => {
    res.send("User path");
});

module.exports = router;
