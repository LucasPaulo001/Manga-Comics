import { body } from "express-validator";

//Validações de cadastro
export const userCreateValidation = () => {
    return[
        body("nome")
        .isString()
        .withMessage("Informe um nome válido.")
        .isLength({min: 4})
        .withMessage("O nome tem que ter no minímo 4 caracteres."),

        body("email")
        .isEmail()
        .withMessage("Informe um E-mail válido!"),

        body("password")
        .isString()
        .withMessage("Informe uma senha válida.")
        .isLength({min: 5})
        .withMessage("A senha tem que ter no mínimo 5 caracteres"),

        body("data_nascimento")
        .isDate()
        .withMessage("Informe uma data válida."),

        body("confirmPassword")
        .isString()
        .withMessage("A confirmação de senha é obrigatória!")
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error("As senhas não são iguais!")
            }

            return true
        })
    ]
}

//Validações de login
export const userLoginValidation = () => {
    return[
        body("email")
        .isString()
        .withMessage("O E-mail é obrigatório.")
        .isEmail()
        .withMessage("Informe um E-mail válido."),

        body("password")
        .isString()
        .withMessage("A senha é obrigatória.")
    ]
}