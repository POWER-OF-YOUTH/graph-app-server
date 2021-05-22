const driver = require('../../lib/database/driver');

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
        let withEmailDbResponse = await driver.session().run("MATCH (n:User) WHERE n.email = $email RETURN n", { email: req.body.email });
        if(withEmailDbResponse.records.length > 0) {
            res.status(406).json({
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
        let withLoginDbResponse = await driver.session().run("MATCH (n:User) WHERE n.login = $login RETURN n", { login: req.body.login });
        if(withLoginDbResponse.records.length > 0) {
            res.status(406).json({
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

/**
 * 
 * @param {String} login 
 * @returns {Promise<any>}
 */
async function find(login) {
    let usersDbResponse = await driver.session().run("MATCH (n:User) WHERE n.login = $login RETURN n AS user", { login });
    if(usersDbResponse.records.length === 1)
        return usersDbResponse.records[0].get("user").properties;
    else
        return null;
}

/**
 * 
 * @param {{ login: String, password: String, email: String, sex: String, name: String, surname: String, patronymic: String }} data 
 * @returns {Promise<{ login: String, email: String, sex: String, name: String, surname: String, patronymic: String }>}
 */
async function create(data) {
    let userDbResponse = await driver.session().run("CREATE (n:User) SET n = $data RETURN n AS user", { data });

    let userDescription = userDbResponse.records[0].get("user").properties;

    return userDescription;
}

module.exports = {
    checkEmailExisting,
    checkLoginExisting,
    find,
    create
};