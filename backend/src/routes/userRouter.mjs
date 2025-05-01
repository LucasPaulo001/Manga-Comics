import express from "express";
const userRouter = express.Router();

//controllers
import { register, login, getCurrentUser } from "../controllers/userController.mjs";

//Middlewares
import { 
    userCreateValidation, 
    userLoginValidation,
    
} 
from "../middlewares/userValidations.mjs";

import { validator, isAdmin  } from "../middlewares/validation.mjs";
import authGuard from "../middlewares/authGurad.mjs";

//Rotas

//Registro
userRouter.post('/register', userCreateValidation(), validator, register);

//Login
userRouter.post('/login', userLoginValidation(), validator, login);

//Rota de perfil de usuário
userRouter.get('/profile', authGuard, getCurrentUser);

export default userRouter;