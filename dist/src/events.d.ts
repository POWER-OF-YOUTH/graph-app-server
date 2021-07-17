declare type UserData = {
    name: string;
    surname: string;
    patronymic: string;
    login: string;
    email: string;
};
declare type GraphId = string;
interface ClientEvents {
    "user:connect": (user: UserData, graphId: GraphId) => void;
}
interface ServerEvents {
    "graph:load": (graph: {
        id: string;
        name: string;
        description: string;
    }) => void;
    "nodes:load": any;
    "relations:load": any;
    "templates:load": any;
    "user:connected": any;
    "user:gone": (user: UserData) => void;
}
export { ServerEvents, ClientEvents, UserData, GraphId };
