import Manga from "../models/Manga.mjs";
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

        const mangaExist = await Manga.findOne({id})

        if(mangaExist){
            return res.status(404).json({message: "Mangá já está salvo!"})
        }
        
        if(!userId){
            return res.status(400).json({message: "Id do usuário é obrigatório!"})
        }

        const newManga = await new Manga({
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


//Rota para remover mangás (salvos)

export const removeMangaSaved = async (req, res) => {
    const { userId, mangaId } = req.body
    try{

        await User.updateOne(
            { _id: userId },
            { $pull: { mangaSaved: mangaId } }
        );

        await Manga.findByIdAndDelete(mangaId)

        res.status(201).json({message: "Removido dos salvos!"})
        
    }
    catch(error){
        res.status(500).json({message: "Erro interno do servidor. "})
    }
}

//Rota de comentário em mangá

export const mangaComment = async (req, res) => {
    const { userId, mangaId, comment } = req.body

    try{

        const user = await User.findById(userId).populate("mangaSaved")

        const hasSaved = user.mangaSaved.some((manga) => manga.id === mangaId)

        if(!hasSaved){
            return res.status(403).json({message: "Você precisa salvar a obra antes de comentar!"})
        }

        const manga = await Manga.findOne({id: mangaId})

        if(!manga){
            res.status(404).json({message: "Obra não encontrada!"})
        }

        const newComment = {
            author: userId,
            comment: comment
        }

        manga.avaliations.push(newComment)
        await manga.save()

        res.status(201).json({newComment})
    }
    catch(error){
        res.status(500).json({message: "Erro interno do servidor."})
        console.log(error)
    }
}

//Rota para listar comentários
export const listComments = async (req, res) => {
    const { mangaId } = req.params

    try{

        const manga = await Manga.findOne({id: mangaId}).populate("avaliations.author")

        if(!manga){
            return res.status(404).json({message: "Obra não encontrada!"})
        }

        const comments = manga.avaliations

        res.status(200).json({comments})


    }
    catch(error){
        res.status(500).json({message: "Erro interno do servidor. "})
        console.log(error)
    }
}
