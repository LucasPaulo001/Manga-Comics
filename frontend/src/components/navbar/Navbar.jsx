
import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { BsPerson, BsSearch } from "react-icons/bs"
import { user } from "../../contexts/UserContext"
import { useAuth } from "../../contexts/AuthContext"


const Navbar = () => {
    const { userData } = user()
    const { token } = useAuth()

    return (
        <>
            {
                token ? (
                    <div className="navbar">
                        <div>
                            <NavLink to={'/'}><h1>Manga Comics</h1></NavLink>
                        </div>
                        <div>
                            <form>
                                <div className="input">
                                    <input className="inputPadrao"
                                        type="text"
                                        placeholder="Busque por algo..."
                                    />
                                    <BsSearch />
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