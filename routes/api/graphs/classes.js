const express = require('express');
const { body, param } = require('express-validator');
const validator = require('../../../lib/validator');
const router = express.Router();
const core = require('../../../lib/core');

router.get("/", async (req, res) => {
    try {
        let classesDescription = await core.getClasses(res.locals.graphId);

        if (classesDescription === null)
            res.status(404).json([]);
        else
            res.json(classesDescription);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

router.use("/:className", 
    param("className").isString(),
    validator,
    (req, res, next) => {
        res.locals.className = req.params.className;
        next();
    }
);

router.get("/:className",
    async (req, res) => {
        try {
            let classDescription = await core.getClass(res.locals.graphId, res.locals.className);

            if (classDescription !== null)
                res.json(classDescription);
            else
                res.status(404).json({});
        }
        catch (error) {
            console.log(error);
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

router.delete("/:className",
    async (req, res) => {
        try {
            let classDescription = await core.deleteClass(res.locals.graphId, res.locals.className);

            console.log(res.locals);
            
            if (classDescription !== null)
                res.json(classDescription);
            else
                res.status(404).json({});
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

module.exports = router;