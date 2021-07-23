import { GraphData, NodeData, RelationData, TemplateData, UserData, TemplateRepresentationData } from '../types';

interface ClientEvents {
    "user:connect": (user: UserData, graphId: string) => void;
    "graph:update": (graph: GraphData) => void;
    "graph:delete": () => void;
    "user:leave": (user: UserData, graphId: string) => void;
    "template:create": (template: TemplateData, templateRepresentaion: TemplateRepresentationData) => void;
    "template:delete": (template: TemplateData) => void;
    "node:create": (node: NodeData) => void;
    "node:select": (node: NodeData) => void;
    "node:edit": (node: NodeData) => void;
    "node:update": (node: NodeData) => void;
    "node:delete": (node: NodeData) => void;
    "node:drag": (node: NodeData) => void;
    "node:drop": (node: NodeData) => void;
    "relation:create": (relation: RelationData) => void;
    "relation:select": (relation: RelationData) => void;
    "relation:delete": (relation: RelationData) => void;  
}

export default ClientEvents;