import { GraphData, NodeData, RelationData, UserData, TemplateData, TemplateRepresentationData } from '../types';

interface ServerEvents {
    "graph:load": (graph: GraphData) => void;
    "nodes:load": (nodes: Array<NodeData>) => void;
    "relations:load": (relations: Array<RelationData>) => void;
    "templates:load": (templates: Array<TemplateData>) => void;
    "user:connected": (user: UserData) => void;
    "user:gone": (user: UserData) => void;
    "graph:updated": (graph: GraphData) => void;
    "graph:deleted": () => void;
    "template:created": (template: TemplateData, templateRepresentaion: any) => void;
    "template:deleted": (template: TemplateData) => void;
    "node:created": (createdNode: NodeData) => void;
    "node:selected": (selectedNodeData: NodeData) => void;
    "node:edit": (node: NodeData) => void;
    "node:updated": (node: NodeData) => void;
    "node:deleted": (node: NodeData) => void;
    "node:dragged": (node: NodeData) => void;
    "node:dropped": (node: NodeData) => void;
    "relation:created": (relation: RelationData) => void;
    "relation:selected": (relation: RelationData) => void;
    "relation:deleted": (relation: RelationData) => void;
}

export default ServerEvents;