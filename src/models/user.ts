import { Graph } from 'graph-app-core';

import Role from './role';
import UserData from "./user_data";

class User
{
    private readonly _userData: UserData;
    private readonly _graphsMap: Map<Role, Array<Graph>>;


    constructor(userData: UserData, graphsMap: Map<Role, Array<Graph>> | null = null) { // TODO: validation
        this._userData = userData;

        if (graphsMap == null) {
            graphsMap = new Map<Role, Array<Graph>>();
            for (let role of Object.values(Role)) {
                if (!isNaN(Number(role))) {
                    // @ts-ignore
                    graphsMap.set(role, []);
                }
            }
        }
        this._graphsMap = graphsMap;
    }

    get login(): string {
        return this._userData.login;
    }

    get password(): string {
        return this._userData.password;
    }

    set password(value) {
        this._userData.password = value;
    }

    get email(): string {
        return this._userData.email;
    }

    get sex(): "male" | "woman" | "unknown" {
        return this._userData.sex;
    }

    set sex(value) {
        this._userData.sex = value;
    }

    get name(): string {
        return this._userData.name;
    }

    set name(value) {
        this._userData.name = value;
    }

    get surname(): string {
        return this._userData.surname;
    }

    set surname(value) {
        this._userData.surname = value;
    }

    get patronymic() {
        return this._userData.patronymic;
    }

    set patronymic(value) {
        this._userData.patronymic = value;
    }

    get graphs(): ReadonlyMap<Role, Array<Graph>> {
        return this._graphsMap;
    }

    addGraph(role: Role, graph: Graph) {
        this._graphsMap.get(role)?.push(graph);
    }
}

export default User;