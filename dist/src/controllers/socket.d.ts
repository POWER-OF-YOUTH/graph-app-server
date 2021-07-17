declare function createServer(req: any, res: any): void;
declare const socketController: {
    createServer: typeof createServer;
};
export default socketController;
