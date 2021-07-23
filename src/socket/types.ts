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

type GraphData = { name: string, id: string, description: string, date: Date };

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

export {
    SessionData,
    GraphData,
    UserData,
    NodeData,
    RelationData,
    TemplateData,
    TemplateRepresentationData
}