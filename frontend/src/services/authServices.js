import { api, requestConfig } from '../utils/config'

const register = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config);
        const json = await res.json();

        // Se a resposta não for bem-sucedida, lançar erro
        if (res) {
            localStorage.setItem("user", JSON.stringify(json));
        }

        // Salvar usuário no localStorage
        
        console.log(data)
        
        console.log(json)
        return json;
        
    } 
        catch (error) {
        console.error("Erro no register:", error.message);
        throw error; // Isso garante que o Redux capture no rejected
    }
   
}

//Logout
const logout = () => {
    localStorage.removeItem("user")
}

const login = async (data) => {

    const config = requestConfig('POST', data)
    try{
        const res = await fetch(api + "/users/login", config)

        const json = await res.json()

        if(res){
            localStorage.setItem("user", JSON.stringify(json))
        }

        return json

    }
    catch(error){
        console.log(error)
    }
}

const authServices = {
    register,
    logout,
    login
}

export default authServices
