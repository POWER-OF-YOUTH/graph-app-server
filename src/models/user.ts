import { Graph } from 'graph-app-core';

import Role from './role';
import UserData from "./user_data";

class User
{
    private readonly _userData: UserData;
    private readonly _graphsMap: Map<Role, Array<Graph>>;

    /**
     * Private constructor
     * @param {UserData} userData
     * @param {Map<Role, Array<Graph>>} graphsMap
     */
    constructor(userData: UserData, graphsMap: Map<Role, Array<Graph>> | null = null) { // TODO: validation
        User.normalizeUserData(userData);
        User.checkUserData(userData);
        this._userData = userData;

        if (graphsMap == null) {
            graphsMap = new Map<Role, Array<Graph>>();
            graphsMap.set(Role.Guest, []);
            graphsMap.set(Role.Editor, []);
            graphsMap.set(Role.Owner, []);
        }
        this._graphsMap = graphsMap;
    }

    /**
     * 
     * @returns {string}
     */
    get login() {
        return this._userData.login;
    }

    /**
     * 
     * @returns {string}
     */
    get password() {
        return this._userData.password;
    }

    /**
     * 
     * @param {string} value
     */
    set password(value) {
        this._userData.password = value;
    }

    /**
     * 
     * @returns {string}
     */
    get email() {
        return this._userData.email;
    }

    /**
     * 
     * @returns {string}
     */
    get sex() {
        return this._userData.sex;
    }

    /**
     * 
     * @param {string} value
     */
    set sex(value) {
        this._userData.sex = value;
    }

    /**
     * 
     * @returns {string}
     */
    get name() {
        return this._userData.name;
    }

    /**
     * 
     * @param {string} value 
     */
    set name(value) {
        this._userData.name = value;
    }

    /**
     * 
     * @returns {string}
     */
    get surname() {
        return this._userData.surname;
    }

    /**
     * 
     * @param {string} value 
     */
    set surname(value) {
        this._userData.surname = value;
    }

    /**
     * 
     * @returns {string}
     */
    get patronymic() {
        return this._userData.patronymic;
    }

    /**
     * @param {string} value
     */
    set patronymic(value) {
        this._userData.patronymic = value;
    }

    /**
     * 
     * @returns {ReadonlyMap<Role, Array<Graph>>}
     */
    get graphs(): ReadonlyMap<Role, Array<Graph>> {
        return this._graphsMap;
    }

    /**
     * 
     * @param {Role} role
     * @param {Graph} graph
     */
    addGraph(role: Role, graph: Graph) {
        this._graphsMap.get(role)?.push(graph);
    }

    /**
     * 
     * @param {UserData} userData 
     * @returns {void}
     */
    private static normalizeUserData(userData: UserData) {
        userData.email = userData.email.toLowerCase();
    }

    /**
     * 
     * @param {UserData} userData
     * @returns {void}
     */
    private static checkUserData(userData: UserData) {
        if (userData == null)
            throw new Error(); // TODO: Error message
        // TODO: validation
    }
}

export default User;