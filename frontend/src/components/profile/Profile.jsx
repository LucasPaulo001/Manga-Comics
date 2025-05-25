import "./Profile.css"
import { useState, useEffect, useContext } from "react"
import { user } from "../../contexts/UserContext"

export const Profile = () => {
    
    const { userData } = user()

    return(
        <div className="profile">
            <span className="line">_</span>
            <div className="dataUser">
                <h1>Dados pessoais</h1>
                <ul>
                    <li><strong>Nome:</strong> {userData.nome}</li>
                    <li><strong>E-mail:</strong> {userData.email}</li>
                </ul>
            </div>

            <span className="line">_</span>

            {userData.isAdmin && (
                <div className="addManga">
                    <h1>Área de admin</h1>
                    <form>
                        <div className="inputAdd">
                            <input type="text" placeholder="Título"/>
                        </div>

                        <div className="inputAdd">
                            <input type="text" placeholder="Autor"/>
                        </div>

                        <div className="inputAdd">
                            <input type="text" placeholder="Gênero"/>
                        </div>

                        <div className="inputAdd">
                            <input type="text" placeholder="Capa"/>
                        </div>

                        <div className="inputAdd">
                            <textarea name="" placeholder="Sínopse" id=""></textarea>
                        </div>

                        <div className="inputAdd">
                            <input type="text" placeholder="Sínopse"/>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}