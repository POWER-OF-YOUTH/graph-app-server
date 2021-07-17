"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
class UserMapper {
    constructor(driver) {
        if (driver == null)
            throw new Error(); // TODO: Error message
        this.driver = driver;
    }
    /**
     * Find user by login or return null
     * @param {string} login
     * @returns {Promise<User>}
     */
    findByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            if (login == null)
                throw new Error(); // TODO: Error message
            try {
                const session = this.driver.session();
                const parameters = {
                    data: {
                        login
                    }
                };
                const dbResponse = yield session.run(`
                MATCH (u:User)
                WHERE u.login = $data.login
                RETURN properties(u)
                AS data
            `, parameters);
                session.close();
                if (dbResponse.records.length == 0)
                    return null;
                const user = new user_1.User(dbResponse.records[0].get("data"));
                return user;
            }
            catch (err) {
                throw new Error("Database error!");
            }
        });
    }
    /**
     * Find user by login or return null
     * @param {string} email
     * @returns {Promise<User | null>}
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email == null)
                throw new Error(); // TODO: Error message
            try {
                email = email.toLowerCase();
                let session = this.driver.session();
                const parameters = {
                    data: {
                        email
                    }
                };
                let dbResponse = yield session.run(`
                MATCH (u:User)
                WHERE u.email = $data.email
                RETURN properties(u)
                AS data
            `, parameters);
                session.close();
                if (dbResponse.records.length == 0)
                    return null;
                let user = new user_1.User(dbResponse.records[0].get("data"));
                return user;
            }
            catch (err) {
                throw new Error("Database error!");
            }
        });
    }
    /**
     *
     * @param {User} user
     * @returns {Promise<void>}
     */
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user == null)
                throw new Error(); // TODO: Error message
            try {
                const session = this.driver.session();
                const parameters = {
                    data: {
                        login: user.login,
                        userData: {
                            email: user.email,
                            login: user.login,
                            password: user.password,
                            name: user.name,
                            surname: user.surname,
                            patronymic: user.patronymic,
                            sex: user.sex
                        }
                    }
                };
                const dbResponse = yield session.run(`
                MERGE (u:User { login: $data.login })
                SET u = $data.userData
            `, parameters);
                session.close();
            }
            catch (err) {
                throw new Error("Database error!");
            }
        });
    }
}
exports.default = UserMapper;
