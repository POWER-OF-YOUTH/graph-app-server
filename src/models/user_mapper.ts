import { Driver, QueryResult } from 'neo4j-driver';
import { GraphMapper, Graph } from 'graph-app-core';

import User from './user';
import Role from './role';

class UserMapper {
    private readonly _roleFieldMap: Map<Role, string> = new Map<Role, string>([
        [Role.Guest, "guest"],
        [Role.Editor, "editor"],
        [Role.Owner, "owner"]
    ]);
    private readonly _driver: Driver;

    constructor(driver: Driver) {
        if (driver == null)
            throw new Error(); // TODO: Error message
        
        this._driver = driver;
    }

    get driver(): Driver {
        return this._driver;
    }

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

            const graphsMap: Map<Role, Array<Graph>> = await this.createGraphsMap(dbResponse);
            const user = new User(dbResponse.records[0].get("data"), graphsMap);

            return user;
        }
        catch (err) {
            console.log(err);
            throw new Error("Database error!");
        }
    }

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

            const graphsMap: Map<Role, Array<Graph>> = await this.createGraphsMap(dbResponse);
            let user = new User(dbResponse.records[0].get("data"), graphsMap);

            return user;
        }
        catch (err) {
            throw new Error("Database error!");
        }
    }

    async save(user: User): Promise<void> {
        if (user == null)
            throw new Error(); // TODO: Error message
        try {
            const session = this.driver.session();

            const userData = {
                email: user.email,
                login: user.login,
                password: user.password,
                name: user.name,
                surname: user.surname,
                patronymic: user.patronymic,
                sex: user.sex
            };
            user.graphs.forEach((value, role) => {
                // @ts-ignore
                userData[this._roleFieldMap.get(role)] = value.map(graph => graph.id);
            });
            const parameters = {
                data: {
                    login: user.login,
                    userData
                }
            };
            const dbResponse = await session.run(`
                MERGE (u:User { login: $data.login })
                SET u = $data.userData
            `, parameters);
            session.close();
        }
        catch (err) {
            console.log(err);
            throw new Error("Database error!");
        }
    }

    private async createGraphsMap(dbResponse: QueryResult): Promise<Map<Role, Array<Graph>>> {
        const gm = new GraphMapper(this._driver);

        const graphsMap = new Map<Role, Array<Graph>>();
        for (let [role, field] of this._roleFieldMap) {
            const graphs: Array<Graph> = await Promise.all(dbResponse.records[0].get("data")[field].map(async (graphId: string) =>
                await gm.findBy({ id: graphId })
            ));
            graphsMap.set(role, graphs);
        }

        return graphsMap;
    }
}

export default UserMapper;