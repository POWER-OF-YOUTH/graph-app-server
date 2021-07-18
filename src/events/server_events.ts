interface ServerEvents {
    "graph:load": (graph: { id: string, name: string, description: string }) => void;
    "nodes:load": any;
    "relations:load": any;
    "templates:load": any;
    "user:connected": any;
    "user:gone": (user: string) => void;
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

export default ServerEvents;