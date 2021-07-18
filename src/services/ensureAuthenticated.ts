function ensureAuthenticated(req: any, res: any, next: any) { // TODO: Types
    if (req.isAuthenticated())
        return next();
    res.status(401).send();
    //res.status(401).redirect("https:vk.com/");
}

export default ensureAuthenticated;