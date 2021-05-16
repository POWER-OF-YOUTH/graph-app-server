const express = require('express');
const { Core, Property } = require('graph-app-core');
const router = express.Router();
const { body, param } = require('express-validator');
const core = require('../../lib/core');
const validator = require('../../lib/validator');
// const { graph } = require('../../controllers');

router.post("/",
    body('name').isString(),
    validator,
    (req, res) => {
        core.createGraph(req.body.name)
            .then(result => res.send(result))
            .catch(error => res.status(500).json(error));
    }
);

router.get("/:graphId",
    param('graphId').isUUID(),
    validator,
    (req, res) => {
        core.getGraph(req.params.graphId)
            .then(result => res.send(result))
            .catch(error => res.status(500).json(error));
    }
);

router.delete("/:graphId",
    param('graphId').isUUID(),
    validator,
    (req, res) => {
        const id = req.params.graphId;
        core.deleteGraph(id)
            .then(result => res.send({id}))
            .catch(error => res.status(500).json(error));
        }
);

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

module.exports = router;
