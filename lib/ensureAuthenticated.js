module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).send("Unauthorized!");
    //res.status(401).redirect("https:vk.com/");
}