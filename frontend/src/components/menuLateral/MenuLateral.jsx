import "./MenuLateral.css"

import { BsBookHalf, BsBoxArrowRight, BsGearFill, BsBookmarkFill, BsNewspaper, BsTagsFill } from "react-icons/bs"

import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export const MenuLateral = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()    
        
    }   

    return (
        <>
            <div className="menuLateral">
                <div className="iconsTop">
                    <ul>
                        <li>
                            <NavLink to={'/mangas'} className={({isActive}) => isActive ? "isActive" : ""}>
                                <BsBookHalf /> Mangas
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to={'/HQs'} className={({isActive}) => isActive ? "isActive" : ""}>
                                <BsBookHalf /> HQs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Salvos'} className={({isActive}) => isActive ? "isActive" : ""}>
                                <BsBookmarkFill /> Salvos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Novidades'} className={({isActive}) => isActive ? "isActive" : ""}>
                                <BsNewspaper /> Novidades
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Generos'} className={({isActive}) => isActive ? "isActive" : ""}>
                                <BsTagsFill /> Gêneros
                            </NavLink>
                        </li>

                    </ul>
                </div>

                <div className="iconsBottom">
                    <ul>
                        <li>
                            <NavLink to={'/Settings'}>
                                <BsGearFill /> Configurações
                            </NavLink>
                        </li>
                        <li onClick={handleLogout} className="logout">
                            <BsBoxArrowRight /> Sair
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}