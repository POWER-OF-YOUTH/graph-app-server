"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const driver_1 = __importDefault(require("./services/driver"));
const graph_app_core_1 = require("graph-app-core");
function socketHandler(socket) {
    let data = {
        room: undefined,
        user: undefined
    };
    socket.on("user:connect", (user, graphId) => __awaiter(this, void 0, void 0, function* () {
        if (!validator_1.default.isUUID(graphId)) { // TODO: validate user data
            socket.disconnect();
            return;
        }
        const gm = new graph_app_core_1.GraphMapper(driver_1.default);
        const graph = yield gm.findBy({ id: graphId });
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
            date: graph.date
        });
        console.log(user);
    }));
    socket.on("disconnect", () => {
        if (data.room)
            socket.to(data.room).emit("user:gone", data.user);
    });
}
exports.default = socketHandler;
