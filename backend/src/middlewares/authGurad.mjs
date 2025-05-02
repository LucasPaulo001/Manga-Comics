import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//Autorização de acesso
const authGuard = async (req, res, next) => {

    //Pegando o token do cabeçalho da requisição
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //Verificando se o token existe
    if(!token){
        return res.status(422).json({errors: ["Acesso negado."]});
    }

    //Informando os dados decodificados do token
    try{
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select("-password");

        next();
    }
    catch(error){
        res.status(422).json({errors: ["Token inválido."]});
        console.log(error);
    }
}

export default authGuard;