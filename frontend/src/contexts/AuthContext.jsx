import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext()

const apiLogin = 'http://localhost:8080/api/users/login'
const apiRegister = 'http://localhost:8080/api/users/register'

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null)
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("")
    const [token, setToken] = useState(null)

    useEffect(() => {
    const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    //Função de login
    const login = async (email, password) => {
        try{
            setErrors([])
            const res = await fetch(apiLogin, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

            const dataJson = await res.json()
            console.log(dataJson)

            if(!res.ok){
                setErrors(dataJson.errors || [])
                return
            }

            setUsuario({_id: dataJson.id})
            setToken(dataJson.token)
            localStorage.setItem("token", dataJson.token)

        }
        catch(error){
            setErrors([{msg: "Erro interno do servidor!", error}])
        }
    }

    //Função de registro
    const register = async (nome, email, password, confirmPassword) => {
        try{
            setErrors([])
            const res = await fetch(apiRegister, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({nome, email, password, confirmPassword})
            })

            const dataJson = await res.json()

            if(!res.ok){
                setErrors([dataJson.errors] || [])
                return
            }

            setSuccess("Cadastro realizado com sucesso!")

        }
        catch(error){
            setErrors([{msg: "Erro interno do servidor!"}])
        }
    }

    //Função de logout
    const logout = () => {
        setUsuario(null)
        setToken(null)
        localStorage.removeItem("token")

    }

    return(
        <AuthContext.Provider value={{login, register, success, logout, errors, usuario, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}