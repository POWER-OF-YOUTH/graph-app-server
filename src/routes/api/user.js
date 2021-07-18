import express from 'express';
import passport from 'passport';

const userRouter = express.Router();

userRouter.use("/", (req, res) => {
    res.send("User path");
});

export default userRouter;
