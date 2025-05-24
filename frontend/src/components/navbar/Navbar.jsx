
import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { BsPerson, BsSearch } from "react-icons/bs"

const Navbar = () => {

    console.log(localStorage.getItem("token"))


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
                            <BsSearch />
                        </div>    
                    </form>
                </div>
                <div id="profileIcon"> 
                   <BsPerson />
                </div>
            </div>
        </>
    )
}

export default Navbar