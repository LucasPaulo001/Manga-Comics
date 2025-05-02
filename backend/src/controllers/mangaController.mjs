import Maga from "../models/Maga.mjs";

//Rotas

//Rota para adicionar mangas ao sistema
export const addMangas = async (req, res) => {
    res.send("Add mangas");
}

//Rota para listar mangas
export const mangas = async (req, res) => {
    res.send("Listando mangas");
}