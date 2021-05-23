const express = require('express');
const { Core, Property } = require('graph-app-core');
const router = express.Router();
const { body, param } = require('express-validator');

const core = require('../../../lib/core');
const graphs = require('../../../controllers/api/graphs');

const validator = require('../../../lib/validator');

const classes = require("./classes");
const nodes = require("./nodes");

router.get("/", 
    body("extended").isBoolean(),
    validator,
    async (req, res) => {
        try {
            let user = req.session.passport.user;

            let ownedGrahpsIds = await graphs.getOwnerGraphsIds(user.login);
            let ownedGrahps = await core.getGraphs(ownedGrahpsIds, req.body.extended);
            ownedGrahps = ownedGrahps.map(graph => { return { ...graph, role: "owner" }});

            let guestGraphsIds = await graphs.getGuestGraphsIds(user.login);
            let guestGraphs = await core.getGraphs(guestGraphsIds, req.body.extended);
            guestGraphs = guestGraphs.map(graph => { return { ...graph, role: "guest" }});

            let editorGraphsIds = await graphs.getEditorGraphsIds(user.login);
            let editorGraphs = await core.getGraph(ownedGrahpsIds, req.body.extended);
            editorGraphs = editorGraphs.map(graph => { return { ...graph, role: "editor" }});

            res.json([...ownedGrahps, ...editorGraphs, ...guestGraphs]);
        }
        catch (error) {
            res.status(500).json({
                errors: [
                    {
                        msg: "Database error!"
                    }
                ]
            });
        }
    }
);

router.post("/",
    body("name").isString(),
    validator,
    async (req, res) => {
        try {
            let graphDescription = await core.createGraph(req.body.name);

            res.json(graphDescription);
        }
        catch (error) {
            res.status(500).json({
                errors: [
                    {
                        msg: "Database error!"
                    }
                ]
            });
        }
    }
);

router.use("/:graphId", 
    param("graphId").isUUID(), 
    validator, 
    (req, res, next) => {
        res.locals.graphId = req.params.graphId;
        next();
    }
);

router.get("/:graphId",
    body("extended").isBoolean(),
    validator,
    async (req, res) => {
        try {
            let graphDescription = await core.getGraph(res.locals.graphId, req.body.extended);

            res.json(graphDescription);
        }
        catch (error) {
            res.status(500).json({
                errors: [
                    {
                        msg: "Database error!"
                    }
                ]
            });
        }
    }
);


router.delete("/:graphId", // TODO:
    async (req, res) => {
        try {
            let graphDescription = await core.deleteGraph(res.locals.graphId, true);

            res.json(graphDescription);
        }
        catch (error) {
            res.status(500).json({
                errors: [
                    {
                        msg: "Database error!"
                    }
                ]
            });
        }
    }
);


router.use("/:graphId/classes", classes);

/*
router.get("/:graphId/classes/:className",
    param('graphId').isUUID(),
    param('className').isString(),
    validator,
    (req, res) => {
        core.getClass(req.params.graphId, req.params.className)
        .then(result => {
                if (Object.getOwnPropertyNames(result).length == 0)
                    res.status(404).json({});
                else
                    res.send(result);
            })
            .catch(error => res.status(500).json(error));
    }
);

router.delete("/:graphId/classes/:className",
    param('graphId').isUUID(),
    param('className').isString(),
    validator,
    (req, res) => {
        const graphId = req.params.graphId;
        const className = req.params.className;
        core.deleteClass(graphId, className)
            .then(result => res.send({graphId, className}))
            .catch(error => res.status(500).json(error));
    }
);

*/

router.post("/:graphId/nodes",
    param('graphId').isUUID(),
    body('className').isString(),
    validator,
    (req, res) => {
        const graphId = req.params.graphId;
        const className = req.body.className;
        core.createNode(graphId, className)
            .then(result => res.send({graphId, className}))
            .catch(error => res.status(500).json(error));
    }
);

router.get("/:graphId/nodes/:nodeId",
    param('graphId').isUUID(),
    param('nodeId').isUUID(),
    validator,
    (req, res) => {
        const graphId = req.params.graphId;
        const nodeId = req.params.nodeId;
        core.getNode(graphId, nodeId)
            .then(result => res.send(result))
            .catch(error => res.status(500).json(error));
    }
);

router.delete("/:graphId/nodes/:nodeId",
    param('graphId').isUUID(),
    param('nodeId').isUUID(),
    validator,
    (req, res) => {
        const graphId = req.params.graphId;
        const nodeId = req.params.nodeId;
        core.deleteNode(graphId, nodeId)
            .then(result => res.send({graphId, nodeId}))
            .catch(error => res.status(500).json(error));
    }
);

/*
router.post("/:graphId/classes",
    param('graphId').isUUID(),
    body('name').isString(),
    body('properties').isArray(),
    body('properties.*.name').isString(),
    body('properties.*.type').isIn(["String", "Number"]),
    validator,
    (req, res) => {
        const properties = req.body.properties.map(x => new Property(x.name, x.type));
        core.createClass(req.params.graphId, req.body.name, properties)
            .then(result => res.send(result))
            .catch(error => {
                res.status(500);
                res.send(error);
            });;
    }
);
*/

module.exports = router;
