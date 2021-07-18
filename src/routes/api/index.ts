import express from 'express';

import ensureAuthenticated from '../../services/ensureAuthenticated';
import userRouter from './user';
import graphsRouter from './graphs';

const apiRouter = express.Router();

apiRouter.use("/user", ensureAuthenticated, userRouter);
apiRouter.use("/graphs", ensureAuthenticated, graphsRouter);

export default apiRouter;
