import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

const apiLogin = 'http://localhost:1526/api/users/login'

const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null)
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(null)

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

            if(!res.ok){
                setErrors(dataJson.errors || [])
                return
            }

            setUsuario(dataJson.user)
            setToken(dataJson.token)
            localStorage.setItem("token", dataJson.token)

        }
        catch(error){
            setErrors([{msg: "Erro interno do servidor!", error}])
        }
    }

    //Função de logout
    const logout = () => {
        setUsuario(null)
        setToken(null)
        localStorage.removeItem("token")

    }

    return(
        <AuthContext.Provider value={{login, logout, errors, usuario, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider