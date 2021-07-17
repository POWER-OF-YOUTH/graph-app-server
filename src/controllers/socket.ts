import socketManager from '../services/socket_manager';

function createServer(req: any, res: any): void {
    const path: string = req.path;
    const graphId: string = req.params?.graphId;
    const timeoutMs: number = req.body.timeout ? req.body.timeout : 5000;
    
    console.log(path);
    socketManager.start(path, timeoutMs);

    res.status(200).send("ok");
}

const socketController = { createServer };
export default socketController;
