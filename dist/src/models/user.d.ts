declare type UserData = {
    login: string;
    password: string;
    email: string;
    sex: string;
    name: string;
    surname: string;
    patronymic: string;
};
declare class User {
    private userData;
    /**
     * Private constructor
     * @param {UserData} userData
     */
    constructor(userData: UserData);
    /**
     *
     * @returns {string}
     */
    get login(): string;
    /**
     *
     * @returns {string}
     */
    get password(): string;
    /**
     *
     * @param {string} value
     */
    set password(value: string);
    /**
     *
     * @returns {string}
     */
    get email(): string;
    /**
     *
     * @returns {string}
     */
    get sex(): string;
    /**
     *
     * @param {string} value
     */
    set sex(value: string);
    /**
     *
     * @returns {string}
     */
    get name(): string;
    /**
     *
     * @param {string} value
     */
    set name(value: string);
    /**
     *
     * @returns {string}
     */
    get surname(): string;
    /**
     *
     * @param {string} value
     */
    set surname(value: string);
    /**
     *
     * @returns {string}
     */
    get patronymic(): string;
    /**
     * @param {string} value
     */
    set patronymic(value: string);
    /**
     *
     * @param {UserData} userData
     * @returns {void}
     */
    private static normalizeUserData;
}
export { User, UserData };
