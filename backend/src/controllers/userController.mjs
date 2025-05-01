import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

//Gerando token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

export const register = (req, res) => {
    res.send("Registro");
}