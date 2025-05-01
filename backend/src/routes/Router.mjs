import express from "express";
const router = express.Router();
import userRouter from "./userRouter.mjs";

router.use('/api/users', userRouter);

router.get("/", (req, res) => {
    res.send("Rota principal funcionando!");
})


export default router;