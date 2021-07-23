
import { Socket } from 'socket.io';
import validator from 'validator';

import driver from '../services/driver';
import { ClientEvents, ServerEvents } from './events';
import { SessionData, UserData } from './types';
import { GraphMapper } from 'graph-app-core';

function socketHandler(socket: Socket<ClientEvents, ServerEvents>) { // TODO: User data validation 

    let data: SessionData = { 
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
        
        data.room = graphId;
        data.user = user;

        socket.join(data.room);
        socket.to(data.room).emit("user:connected", user);
        socket.emit("graph:load", {
            id: graph.id,
            name: graph.name,
            description: graph.description,
            //date: graph.date
        });
        console.log(user);
    });
    socket.on("disconnect", () => {
        if (data.room)
            socket.to(data.room).emit("user:gone", <UserData>data.user);
    });
}

export default socketHandler;