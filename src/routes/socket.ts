import express from 'express';
import { body, param, validationResult } from 'express-validator';

import socketController from '../controllers/socket';

const socketRouter = express.Router();

const validator = (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        res.status(422).json(errors);
    else
        next();
};


socketRouter.get("/socket/:graphId", 
    param("graphId").isUUID(),
    body("timeout").isInt().optional(),
    validator,
    socketController.createServer
);

export default socketRouter;