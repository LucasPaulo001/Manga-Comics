import express from "express";
const router = express.Router();
import userRouter from "./userRouter.mjs";
import mangaRouter from "./mangaRouter.mjs";

router.use('/api/users', userRouter);
router.use('/api/mangaHQs', mangaRouter);


export default router;