
import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    return(
        <>
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
                        </div>    
                    </form>
                </div>
                <div>
                    Perfil
                </div>
            </div>
        </>
    )
}

export default Navbar