type UserData = {
    name: string;
    surname: string;
    patronymic: string;
    login: string;
    email: string;
}

type GraphId = string;

interface ClientEvents {
    "user:connect": (user: UserData, graphId: GraphId) => void;
/*
    "graph:update";
    "graph:delete";
    "user:leave";
    "template:create";
    "template:delete";
    "node:create";
    "node:select";
    "node:edit";
    "node:delete";
    "node:drag";
    "node:drop";
    "relation:create";
    "relation:select";
    "relation:delete";
*/
}

interface ServerEvents {
    "graph:load": (graph: { id: string, name: string, description: string }) => void;
    "nodes:load": any;
    "relations:load": any;
    "templates:load": any;
    "user:connected": any;
    "user:gone": (user: UserData) => void;
/*
    "graph:updated";
    "graph:deleted";
    "template:created";
    "template:deleted";
    "node:created";
    "node:selected";
    "node:edited";
    "node:deleted";
    "node:dragged";
    "node:dropped";
    "relation:created";
    "relation:selected";
    "relation:deleted";
*/
}

export { ServerEvents, ClientEvents, UserData, GraphId };