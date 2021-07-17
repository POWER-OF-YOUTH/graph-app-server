import { Driver } from 'neo4j-driver';

import { User } from './user';

class UserMapper {
    private readonly driver: Driver;

    constructor(driver: Driver) {
        if (driver == null)
            throw new Error(); // TODO: Error message
        
        this.driver = driver;
    }

    /**
     * Find user by login or return null
     * @param {string} login 
     * @returns {Promise<User>}
     */
    async findByLogin(login: string): Promise<User | null> {
        if (login == null)
            throw new Error(); // TODO: Error message
        try {
            const session = this.driver.session();
            const parameters = {
                data: {
                    login
                }
            }
            const dbResponse = await session.run(`
                MATCH (u:User)
                WHERE u.login = $data.login
                RETURN properties(u)
                AS data
            `, parameters);
            session.close();

            if (dbResponse.records.length == 0)
                return null;

            const user = new User(dbResponse.records[0].get("data"));

            return user;
        }
        catch (err) {
            throw new Error("Database error!");
        }
    }

    /**
     * Find user by login or return null
     * @param {string} email 
     * @returns {Promise<User | null>}
     */
    async findByEmail(email: string): Promise<User | null> {
        if (email == null)
            throw new Error(); // TODO: Error message
        try {
            email = email.toLowerCase();

            let session = this.driver.session();
            const parameters = {
                data: {
                    email
                }
            }
            let dbResponse = await session.run(`
                MATCH (u:User)
                WHERE u.email = $data.email
                RETURN properties(u)
                AS data
            `, parameters);
            session.close();

            if (dbResponse.records.length == 0)
                return null;

            let user = new User(dbResponse.records[0].get("data"));

            return user;
        }
        catch (err) {
            throw new Error("Database error!");
        }
    }

    /**
     * 
     * @param {User} user
     * @returns {Promise<void>}
     */
    async save(user: User): Promise<void> {
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

            const dbResponse = await session.run(`
                MERGE (u:User { login: $data.login })
                SET u = $data.userData
            `, parameters);
            session.close();
        }
        catch (err) {
            throw new Error("Database error!");
        }
    }
}

export default UserMapper;