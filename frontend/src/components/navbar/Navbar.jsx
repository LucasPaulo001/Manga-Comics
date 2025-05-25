
import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { BsPerson, BsSearch } from "react-icons/bs"
import { user } from "../../contexts/UserContext"
import { useAuth } from "../../contexts/AuthContext"
import { useSearch } from "../../contexts/SearchContext"
import { useState } from "react"


const Navbar = () => {
    const { userData } = user()
    const { token } = useAuth()
    const { setSearchTerm } = useSearch()
    const [term, setTerm] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
            setSearchTerm(term)
        }

    return (
        <>
            {
                token ? (
                    <div className="navbar">
                        <div>
                            <NavLink to={'/'}><h1>Manga Comics</h1></NavLink>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="input">
                                    <input className="inputPadrao"
                                        type="text"
                                        placeholder="Busque por algo..."
                                        onChange={(e) => setTerm(e.target.value)}
                                    />
                                    <button><BsSearch /></button>
                                </div>
                            </form>
                        </div>
                        <div id="profileIcon">
                            {
                                 token ? (
                                    <NavLink to={'/profile'}>
                                        {userData.nome}
                                        <BsPerson />
                                    </NavLink>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }

        </>
    )
}

export default Navbar