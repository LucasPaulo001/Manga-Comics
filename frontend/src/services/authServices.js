import { api, requestConfig } from '../utils/config'

const register = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config);
        const json = await res.json();

        // Se a resposta não for bem-sucedida, lançar erro
        if (!res.ok) {
        throw new Error(json.errors ? json.errors[0] : "Erro ao registrar");
        }

        // Salvar usuário no localStorage
        localStorage.setItem("user", JSON.stringify(json));
         console.log(data)

        return json;
    } 
        catch (error) {
        console.error("Erro no register:", error.message);
        throw error; // Isso garante que o Redux capture no rejected
    }
   
}

const authServices = {
    register,
}

export default authServices
