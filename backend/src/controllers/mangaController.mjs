import Maga from "../models/Maga.mjs";
import User from "../models/User.mjs";

//Rotas

//Rota para adicionar mangas ao sistema
export const addMangas = async (req, res) => {
    res.send("Add mangas");
}

//Rota para salvar mangás
export const saveManga = async (req, res) => {
    const { userId, title, coverUrl, description, id } = req.body

    try{

        const mangaExist = await Maga.findOne({id})

        if(mangaExist){
            return res.status(404).json({message: "Mangá já está salvo!"})
        }
        
        if(!userId){
            return res.status(400).json({message: "Id do usuário é obrigatório!"})
        }

        const newManga = await new Maga({
            title,
            coverUrl,
            description,
            id
        })

        await newManga.save()

        await User.updateOne(
            {_id: userId},
            {$push: { mangaSaved: newManga._id }}
        )

        return res.status(201).json({
            message: "Mangá salvo com sucesso!",
            manga: newManga
        })
    }
    catch(error){
        res.status(500).json({error: "Erro interno do servidor!"})
        console.log(error)
    }
}

//Rota para listar mangás salvos
export const mangaSaved = async (req, res) => {
    const { userId } = req.params

    if(!userId){
        return res.status(404).json({message: "O Id do usuário é obrigatório!"})
    }

    try{

        const user = await User.findById(userId)
        .populate("mangaSaved")

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        return res.status(200).json({
            savedManga: user.mangaSaved
        })      
        
    }
    catch(error){
        res.status(500).json({message: "Erro interno do servidor!"})
    }
}

//Rota para listar mangas
export const mangas = async (req, res) => {
    res.send("Listando mangas");
}