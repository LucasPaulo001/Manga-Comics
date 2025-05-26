import express from "express";
const mangaRouter = express.Router();

//Controllers
import { addMangas } from "../controllers/mangaController.mjs";
import { mangas } from "../controllers/mangaController.mjs";
import { saveManga } from "../controllers/mangaController.mjs";
import { mangaSaved } from "../controllers/mangaController.mjs";
import { removeMangaSaved } from "../controllers/mangaController.mjs";

//Middlewares
import authGuard from "../middlewares/authGurad.mjs";
import { isAdmin } from "../middlewares/validation.mjs";

//Rotas

//Adicionar mangas (admin)
mangaRouter.post('/mangas', authGuard, isAdmin, addMangas);

//Salvar mangás
mangaRouter.post('/save', saveManga)

//Listando mangás salvos
mangaRouter.get('/mangaSaved/:userId', mangaSaved)

//Listar mangas
mangaRouter.get('/mangas', authGuard, mangas);

//Remover mangas (salvos)
mangaRouter.delete('/mangaRemove', removeMangaSaved)

export default mangaRouter;