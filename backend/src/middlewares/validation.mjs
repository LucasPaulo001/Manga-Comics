import { validationResult } from "express-validator";

//Middleware de captura de errors
export const validator = (req, res, next) => {

    //Capturando erros na requisição
    const errors = validationResult(req);

    //Se não houver erros vai para o próximo middleware
    if(errors.isEmpty()){
        return next();
    }

    //Array de erros, vazio
    const extractedErrors = [];

    //Transformando os erros em array, percorrendo e adicionando ao array de extração de erros
    errors.array().map((err) => extractedErrors.push(err.msg));

    //Retornando erros
    return res.status(201).json({
        errors: extractedErrors,
    });
}

//Validação de atribuições de admin
export const isAdmin = (req, res, next) => {
    if(!req.user || !req.user.isAdmin){
        return res.status(422).json({errors: ["Acesso negado: apenas Admins!"]});
    }
    console.log(req.user);

    next();
}