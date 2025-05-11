import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

//Gerando token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId, isAdmin: userId.isAdmin}, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

//Rota de registro de usuários
export const register = async(req, res) => {
    const { nome, email, password } = req.body;

    try{
        //Buscando usuário no banco
        const user = await User.findOne({email});

        //Validações
        if(user){
            return res.status(422).json({errors: ["Usuário já existe."]}); 
        }

        //Criptografia de senha
        const salts = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(password, salts);

        //Criando usuário no banco de dados
        const newUser = new User({
            nome,
            email,
            password: hashPass,
        });

        //Salvando usuário
        await newUser.save();

        res.status(200).json({
            _id: newUser._id,
            token: generateToken(newUser._id)
        });
    }
    catch(error){
        console.error("Erro no registro de usuário:", error); // Logando o erro real
        res.status(422).json({ errors: ["Erro ao se cadastrar, tente novamente mais tarde."] });
    }
}

//Rota de login do usuário
export const login = async(req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({errors: ["Usuário não encontrado."]})
        }

        if(!(await bcryptjs.compare(password, user.password))){
            return res.status(422).json({errors: ["Senha incorreta."]});
        }

        res.status(200).json({
            _id: user._id,
            token: generateToken(user._id, user.isAdmin)
        });
    }
    catch(error){
        res.status(422).json({errors: ["Houve um erro ao fazer login, tente novamente mais tarde: "]});
    }
}

//Pegando usuário logado
export const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json({user});
}