declare class SocketManager {
    private readonly paths;
    private readonly server;
    /**
     *
     * @param {string} path
     * @param {Server} server
     * @param {number} ms
     * @returns {Promise<void>}
     */
    start(path: string, ms: number): Promise<void>;
}
declare const socketManager: SocketManager;
export default socketManager;
