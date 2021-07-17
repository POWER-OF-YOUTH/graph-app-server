"use strict";

const neo4j = require('neo4j-driver');
const driver = require('../services/driver');

type UserData = { 
    login: string, 
    password: string, 
    email: string, 
    sex: string, 
    name: string, 
    surname: string, 
    patronymic: string 
};

class User
{
    private userData: UserData;
    /**
     * Private constructor
     * @param {UserData} userData
     */
    constructor(userData: UserData) {
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
    private static normalizeUserData(userData: UserData) {
        userData.email = userData.email.toLowerCase();
    }
}

export { User, UserData };