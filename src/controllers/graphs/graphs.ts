import { GraphMapper, Graph } from 'graph-app-core';

import driver from '../../services/driver';
import UserMapper from '../../models/user_mapper';
import User from '../../models/user';
import Role from '../../models/role';

async function getUserGraphs(req: any, res: any) { // TODO: Types
    try {
        const um = new UserMapper(driver);

        const login = req.user.login
        const user = <User>await um.findByLogin(login);

        const response = [];
        for (let key of user.graphs.keys()) {
            for (let graph of <Array<Graph>>user.graphs.get(key)) {
                response.push({
                    role: key,
                    id: graph.id,
                    name: graph.name,
                    description: graph.description,
                    date: graph.date
                })
            }
        }

        res.json(response);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const graphsController = { getUserGraphs };
export default graphsController;