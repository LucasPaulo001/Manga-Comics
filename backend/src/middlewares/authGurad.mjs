import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(422).json({errors: ["Acesso negado."]});
    }

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