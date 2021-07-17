declare function register(req: any, res: any): Promise<void>;
declare function login(req: any, res: any): Promise<void>;
declare function logout(req: any, res: any): Promise<void>;
declare function check(req: any, res: any): void;
declare const authController: {
    register: typeof register;
    login: typeof login;
    logout: typeof logout;
    check: typeof check;
};
export default authController;
