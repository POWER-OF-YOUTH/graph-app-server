
import { Socket } from 'socket.io';
import validator from 'validator';

import driver from '../services/driver';
import { ClientEvents, ServerEvents } from './events';
import { getNodeData, getRelationData, getTemplateData, SessionData, UserData } from './types';
import { GraphMapper, NodeMapper, RelationMapper, TemplateMapper, Variable } from 'graph-app-core';



function socketHandler(socket: Socket<ClientEvents, ServerEvents>) { // TODO: User data validation 
    const data: SessionData = { 
        room: undefined,
        user: undefined
    }

    socket.on("user:connect", async (user: UserData, graphId: string) => {
        if (!validator.isUUID(graphId)) { // TODO: validate user data
            socket.disconnect();
            return;
        }

        const gm = new GraphMapper(driver);
        const graph = await gm.findBy({id: graphId});
        if (graph === null) {
            socket.disconnect();
            return;
        }
        const tm = new TemplateMapper(driver, graph);
        const nm = new NodeMapper(driver, graph);
        const rm = new RelationMapper(driver, graph);

        data.room = graphId;
        data.user = user;

        socket.join(data.room);

        socket.to(data.room).emit("user:connected", user);

        socket.emit("graph:load", {
            id: graph.id,
            name: graph.name,
            description: graph.description,
            date: graph.date
        });

        const nodes = await nm.all();
        socket.emit("nodes:load", nodes.map(n => getNodeData(n)));

        const templates = await tm.all();
        socket.emit("templates:load", templates.map(t => getTemplateData(t)), []);

        const relations = await rm.all();
        socket.emit("relations:load", relations.map(r => getRelationData(r)));
    });
    
    socket.on("disconnect", () => {
        if (data.room)
            socket.to(data.room).emit("user:gone", <UserData>data.user);
    });
}

export default socketHandler;