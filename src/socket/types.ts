import { Node, Relation, Graph, Template, Variable, GraphMapper } from 'graph-app-core';

type UserData = { 
    login: string, 
    password: string, 
    email: string, 
    sex: string, 
    name: string, 
    surname: string, 
    patronymic: string 
};

type SessionData = { 
    room: string | undefined, 
    user: UserData | undefined 
};

type GraphData = { name: string, id: string, description: string, date: number | Date };

type VariableData = {name: string, value: { type: string, data: any }};

type NodeData = {
    id: string,
    template: TemplateData,
    variables: Array<VariableData>
};

type RelationData = {
    from: NodeData,
    to: NodeData,
    name: string,
    id: string
};

type TemplateData = {
    name: string,
    variables: Array<VariableData>
};

type TemplateRepresentationData = any; 

function getGraphData(graph: Graph): GraphData {
    return {
        name: graph.name,
        id: graph.id,
        description: graph.description,
        date: graph.date
    }
}

function getVariableData(variable: Variable): VariableData {
    return {
        name: variable.name,
        value: {
            type: variable.value.type.name,
            data: variable.value.data
        }
    }
}

function getTemplateData(template: Template): TemplateData {
    return {
        name: template.name,
        variables: template.variables().map(v => getVariableData(v))
    }
}

function getNodeData(node: Node): NodeData {
    return {
        id: node.id,
        template: getTemplateData(node.template),
        variables: node.variables().map(v => getVariableData(v))
    };
}

function getRelationData(relation: Relation): RelationData {
    return {
        from: getNodeData(relation.from),
        to: getNodeData(relation.to),
        id: relation.id,
        name: relation.name
    }
}

export {
    SessionData,
    GraphData,
    UserData,
    NodeData,
    RelationData,
    TemplateData,
    TemplateRepresentationData,
    getGraphData,
    getVariableData,
    getTemplateData,
    getNodeData,
    getRelationData
}