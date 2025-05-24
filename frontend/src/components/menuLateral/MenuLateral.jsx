import "./MenuLateral.css"

import { BsBookHalf, BsBookmarkFill, BsNewspaper, BsTagsFill } from "react-icons/bs"

import { Link, NavLink } from "react-router-dom"

export const MenuLateral = () => {
    return (
        <>
            <div className="menuLateral">
                <div className="iconsTop">
                    <ul>
                        <li className="">
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
            </div>
        </>
    )
}