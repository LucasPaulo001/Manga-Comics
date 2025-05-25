import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext()

const apiProfile = 'http://localhost:8080/api/users/profile'
const token = localStorage.getItem("token")

import { useAuth } from "./AuthContext";

export const UserPovider = ({children}) => {
    const [userData, setUserData] = useState({})
    const { usuario, token } = useAuth()

    useEffect(() => {
         const fetchUserData = async () => {
            if (token) {
                try {
                    const res = await fetch(`http://localhost:8080/api/users/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    const data = await res.json()
                    setUserData(data.user)
                    console.log(data.user)
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error)
                }
            } else {
                setUserData({})
            }
        }

        fetchUserData()
    }, [usuario, token])
   
    return(
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const user = () => {
    return useContext(UserContext)
}