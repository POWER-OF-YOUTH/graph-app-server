import driver from '../services/driver';
import UserMapper from '../models/user_mapper';
import { User, UserData } from '../models/user';

async function register(req: any, res: any) { // TODO: Types
    try {
        const um = new UserMapper(driver);

        const userData: UserData = req.body;
        const user = new User(userData);
    
        await um.save(user);

        res.json({
            login: user.login,
            password: user.password,
            email: user.email,
            sex: user.sex,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

async function login(req: any, res: any) { // TODO: Types
    try {
        const um = new UserMapper(driver);

        const login: string = req.body.login;
        const user = <User>await um.findByLogin(login);

        res.json({
            login: user.login,
            password: user.password,
            email: user.email,
            sex: user.sex,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

async function logout(req: any, res: any) { // TODO: Types
    req.session.destroy(undefined);
    res.json({});
}

function check(req: any, res: any) { // TODO: Types
    if (req.user)
        res.status(200).send();
    else
        res.status(401).send();
}

const authController = { register, login, logout, check };
export default authController;