const driver = require('../lib/database/driver');

// Neo4j database constraints
/**
 * CREATE CONSTRAINT unique_user_email ON (n:User) ASSERT n.email IS UNIQUE
 * CREATE CONSTRAINT unique_user_login ON (n:User) ASSERT n.login IS UNIQUE
 */
//

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {any} next 
 * @returns {Promise<void>}
 */
async function checkEmailExisting(req, res, next) {
    try {
        let withEmail = await driver.session().run("MATCH (n:User) WHERE n.email = $email RETURN n", { email: req.body.email });
        if(withEmail.records.length > 0) {
            res.status(406).send({
                errors: [
                    {
                        msg: "Email already exists!",
                        param: "email",
                        location: "body"
                    }
                ]
            });
        }
        else
            next();
    } 
    catch (err) {
        res.status(500).send(err);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {any} next 
 * @returns {Promise<void>}
 */
async function checkLoginExisting(req, res, next) {
    try {
        let withLogin = await driver.session().run("MATCH (n:User) WHERE n.login = $login RETURN n", { login: req.body.login });
        if(withLogin.records.length > 0) {
            res.status(406).send({
                errors: [
                    {
                        msg: "Login already exists!",
                        param: "login",
                        location: "body"
                    }
                ]
            });
        }
        else
            next();
    }
    catch (err) {
        res.status(500).send(err);
    }
}

async function find(login) {
    let users = await driver.session().run("MATCH (n:User) WHERE n.login = $login RETURN n AS user", { login });
    if(users.records.length === 1) {
        return users.records[0].get("user").properties;
    }
    else
        return undefined;
}

/**
 * 
 * @param {{ login: String, password: String, email: String, sex: String, name: String, surname: String, patronymic: String }} data 
 * @returns {Promise<void>}
 */
async function create(data) {
    await driver.session().run("CREATE (n:User) SET n = $data", { data });
}

module.exports = {
    checkEmailExisting,
    checkLoginExisting,
    find,
    create
};