import { Driver } from 'neo4j-driver';
import { User } from './user';
declare class UserMapper {
    private readonly driver;
    constructor(driver: Driver);
    /**
     * Find user by login or return null
     * @param {string} login
     * @returns {Promise<User>}
     */
    findByLogin(login: string): Promise<User | null>;
    /**
     * Find user by login or return null
     * @param {string} email
     * @returns {Promise<User | null>}
     */
    findByEmail(email: string): Promise<User | null>;
    /**
     *
     * @param {User} user
     * @returns {Promise<void>}
     */
    save(user: User): Promise<void>;
}
export default UserMapper;
