import express from "express";
const mangaRouter = express.Router();

//Controllers
import { addMangas } from "../controllers/mangaController.mjs";
import { mangas } from "../controllers/mangaController.mjs";

//Middlewares
import authGuard from "../middlewares/authGurad.mjs";
import { isAdmin } from "../middlewares/validation.mjs";

//Rotas

//Adicionar mangas (admin)
mangaRouter.post('/mangas', authGuard, isAdmin, addMangas);

//Listar mangas
mangaRouter.get('/mangas', authGuard, mangas);

export default mangaRouter;