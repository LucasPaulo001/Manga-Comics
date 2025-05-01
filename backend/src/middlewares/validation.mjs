import { validationResult } from "express-validator";

//Middleware de captura de errors
export const registerValidator = (req, res, next) => {

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