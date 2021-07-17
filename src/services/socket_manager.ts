import { Server } from 'socket.io';

import { httpServer as httpS, httpServer } from '../app';

const io = new Server(httpServer);

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
} 

class SocketManager 
{
    private readonly paths = new Set<string>();
    private readonly server = new Server(httpServer);

    /**
     * 
     * @param {string} path
     * @param {Server} server
     * @param {number} ms
     * @returns {Promise<void>}
     */
    async start(path: string, ms: number): Promise<void> {
        if (this.paths.has(path))
            return;
        this.paths.add(path);

        const namespace = this.server.of(path)
        namespace.on("connection", socket => {
            socket.on("test", (data) => {
                console.log("test"); 
                console.log(data);
            })
            console.log("Connected!");
            socket.send("ok");
        });

        console.log("Server created!");
    
        await sleep(ms);
    
        while (namespace.sockets.values.length > 0)
            await sleep(ms);

        namespace.disconnectSockets();
        namespace.removeAllListeners();
        this.server._nsps.delete(path);
        this.paths.delete(path);

        console.log("Server closed!");
    }
}

const socketManager = new SocketManager();

export default socketManager;