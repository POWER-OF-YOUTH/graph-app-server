const driver = require('../../lib/database/driver');

async function isOwnerOf(login, graphId) {
    let session = driver.session();

    let relationDbResponse = await session.run(`
        MATCH (u:User)-[rel:OWNER]->(g:Graph) 
        WHERE u.login = $login AND g.id = $graphId
        RETURN rel
    `, { login, graphId });

    session.close();

    return relationDbResponse.records.length === 1;
}

async function isGuestOf(login, graphId) {
    let session = driver.session();

    let relationDbResponse = await session.run(`
        MATCH (u:User)-[rel:GUEST]->(g:Graph) 
        WHERE u.login = $login AND g.id = $graphId
        RETURN rel
    `, { login, graphId });

    session.close();

    return relationDbResponse.records.length === 1;
}

async function isEditorOf(login, graphId) {
    let session = driver.session();

    let relationDbResponse = await session.run(`
        MATCH (u:User)-[rel:EDITOR]->(g:Graph) 
        WHERE u.login = $login AND g.id = $graphId
        RETURN rel
    `, { login, graphId });

    session.close();

    return relationDbResponse.records.length === 1;
}

async function getOwnerGraphsIds(login) {
    let session = driver.session();

    let graphDbResponse = await session.run(`
        MATCH (u:User)-[:OWNER]->(g:Graph) 
        WHERE u.login = $login
        RETURN g.id AS id
    `, { login });

    session.close();

    return graphDbResponse.records.map(record => record.get("id"));
}

async function getGuestGraphsIds(login) {
    let session = driver.session();

    let graphDbResponse = await session.run(`
        MATCH (u:User)-[:GUEST]->(g:Graph) 
        WHERE u.login = $login
        RETURN g.id AS id
    `, { login });

    session.close();

    return graphDbResponse.records.map(record => record.get("id"));
}

async function getEditorGraphsIds(login) {
    let session = driver.session();

    let graphDbResponse = await session.run(`
        MATCH (u:User)-[:EDITOR]->(g:Graph) 
        WHERE u.login = $login
        RETURN g.id AS id
    `, { login });

    session.close();

    return graphDbResponse.records.map(record => record.get("id"));
}

module.exports = {
    isOwnerOf,
    isGuestOf,
    getOwnerGraphsIds,
    getGuestGraphsIds,
    getEditorGraphsIds
};