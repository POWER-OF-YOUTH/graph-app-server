import UserData from '../models/user_data';

interface ClientEvents {
    "user:connect": (user: UserData, graphId: string) => void;
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

export default ClientEvents;