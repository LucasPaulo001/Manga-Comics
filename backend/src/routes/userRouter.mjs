import express from "express";
const userRouter = express.Router();

//controllers
import { register } from "../controllers/userController.mjs";

//Middlewares
import { userCreateValidation } from "../middlewares/userValidations.mjs";
import { registerValidator } from "../middlewares/validation.mjs";

//Rotas
userRouter.post('/register', userCreateValidation(), registerValidator, register);

export default userRouter;