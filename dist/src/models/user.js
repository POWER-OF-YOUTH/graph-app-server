"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const neo4j = require('neo4j-driver');
const driver = require('../services/driver');
class User {
    /**
     * Private constructor
     * @param {UserData} userData
     */
    constructor(userData) {
        User.normalizeUserData(userData);
        this.userData = userData;
    }
    /**
     *
     * @returns {string}
     */
    get login() {
        return this.userData.login;
    }
    /**
     *
     * @returns {string}
     */
    get password() {
        return this.userData.password;
    }
    /**
     *
     * @param {string} value
     */
    set password(value) {
        this.userData.password = value;
    }
    /**
     *
     * @returns {string}
     */
    get email() {
        return this.userData.email;
    }
    /**
     *
     * @returns {string}
     */
    get sex() {
        return this.userData.sex;
    }
    /**
     *
     * @param {string} value
     */
    set sex(value) {
        this.userData.sex = value;
    }
    /**
     *
     * @returns {string}
     */
    get name() {
        return this.userData.name;
    }
    /**
     *
     * @param {string} value
     */
    set name(value) {
        this.userData.name = value;
    }
    /**
     *
     * @returns {string}
     */
    get surname() {
        return this.userData.surname;
    }
    /**
     *
     * @param {string} value
     */
    set surname(value) {
        this.userData.surname = value;
    }
    /**
     *
     * @returns {string}
     */
    get patronymic() {
        return this.userData.patronymic;
    }
    /**
     * @param {string} value
     */
    set patronymic(value) {
        this.userData.patronymic = value;
    }
    /**
     *
     * @param {UserData} userData
     * @returns {void}
     */
    static normalizeUserData(userData) {
        userData.email = userData.email.toLowerCase();
    }
}
exports.User = User;
